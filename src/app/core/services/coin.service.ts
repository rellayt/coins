import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, } from 'rxjs/operators';
import { CoinMetadata, CoinListPayload, Coin } from '../models/coin.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private coinsMetadata = new BehaviorSubject<CoinMetadata[]>([])
  private coinsSubject = new BehaviorSubject<Coin[]>([])

  constructor(private apiService: ApiService) { this.getCoinsMetadata() }

  add(symbol: string): void {
    this.apiService.get(`/coins/${this.getCoinId(symbol)}`)
      .pipe(
        map(({ id, symbol, name, market_data }) => {
          const { current_price: { usd } } = market_data
          const { price_change_percentage_1h_in_currency: { usd: lastHour } } = market_data
          return { id, symbol, name, usd: `${usd}$`, lastHour }
        }),
      ).subscribe(coin => {
        const sortedCoins = [coin, ...this.coinsSubject.value].sort((a, b) => a.lastHour - b.lastHour)
        this.coinsSubject.next(sortedCoins)
      })
  }

  getCoinList(): Observable<Coin[]> {
    return this.coinsSubject.asObservable()
  }

  private getCoinsMetadata(): void {
    this.apiService.get('/coins/list')
      .pipe(map((crypto: CoinListPayload[]) => crypto.map(({ id, symbol }) => ({ [id]: symbol }))))
      .subscribe((crypto: CoinMetadata[]) => this.coinsMetadata.next(crypto))
  }

  private getCoinId(symbol: string): string {
    const coin = this.coinsMetadata.value.filter(c => Object.values(c)[0] === symbol).pop()
    if (!coin) throw 'NOT_FOUND'

    const [coinId] = Object.keys(coin)
    const isDuplicated = this.coinsSubject.getValue().some(({ id }) => id === coinId)
    if (isDuplicated) throw 'DUPLICATED'

    return coinId
  }

}
