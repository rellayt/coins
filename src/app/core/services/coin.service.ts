import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { map, mergeMap, } from 'rxjs/operators';
import { CoinMetadata, CoinListPayload, Coin } from '../models/coin.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private coinsMetadata = new BehaviorSubject<CoinMetadata[]>([])
  private coinsSubject = new BehaviorSubject<Coin[]>([])

  constructor(private apiService: ApiService) {
    this.getCoinsMetadata()

    const savedCoinsId = window.localStorage.getItem('coinsId')
    if (savedCoinsId) {
      const { coinsId } = JSON.parse(savedCoinsId)
      of(coinsId).pipe(
        mergeMap(coinsId => forkJoin(coinsId.map((id: string) => this.getCoin(id)))),
        map((coins: Coin[]) => coins.sort((a, b) => a.lastHour - b.lastHour))
      ).subscribe((coins: Coin[]) => this.coinsSubject.next(coins))
    }
  }

  addCoin(symbol: string): void {
    this.getCoin(this.getCoinId(symbol)).subscribe(coin => {
      const sortedCoins = [coin, ...this.coinsSubject.value].sort((a, b) => a.lastHour - b.lastHour)
      const coinsId = sortedCoins.map(({ id }) => id)
      window.localStorage.setItem('coinsId', JSON.stringify({ coinsId }))
      this.coinsSubject.next(sortedCoins)
    })
  }

  resetCoinList(): void {
    window.localStorage.clear()
    this.coinsSubject.next([])
  }

  getCoinList(): Observable<Coin[]> {
    return this.coinsSubject.asObservable()
  }

  private getCoin(id: string) {
    return this.apiService.get(`/coins/${id}`)
      .pipe(
        map(({ id, symbol, name, market_data }) => {
          const { current_price: { usd } } = market_data
          const { price_change_percentage_1h_in_currency: { usd: lastHour } } = market_data
          return { id, symbol, name, usd: `${usd}$`, lastHour }
        })
      )
  }

  private getCoinId(symbol: string): string {
    const coin = this.coinsMetadata.value.filter(c => Object.values(c)[0] === symbol).pop()
    if (!coin) throw 'NOT_FOUND'

    const [coinId] = Object.keys(coin)
    const isDuplicated = this.coinsSubject.getValue().some(({ id }) => id === coinId)
    if (isDuplicated) throw 'DUPLICATED'

    return coinId
  }

  private getCoinsMetadata(): void {
    this.apiService.get('/coins/list')
      .pipe(map((crypto: CoinListPayload[]) => crypto.map(({ id, symbol }) => ({ [id]: symbol }))))
      .subscribe((crypto: CoinMetadata[]) => this.coinsMetadata.next(crypto))
  }

}
