import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, first, map, tap } from 'rxjs/operators';
import { CoinMetadata, CoinListPayload, Coin } from '../models/coin.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private coinsMetadata = new BehaviorSubject<CoinMetadata[]>([])
  private coinListSubject = new BehaviorSubject<Coin[]>([])
  private coinList = this.coinListSubject.asObservable()

  constructor(private apiService: ApiService) {
    this.getCryptoMetadata()
  }

  add(symbol: string): void {
    const crypto = this.coinsMetadata.value.filter(c => Object.keys(c)[0] === symbol).pop()
    if (!crypto) return
    const cryptoId = Object.values(crypto)[0]
    this.apiService.get(`/coins/${cryptoId}`)
      .pipe(
        first(),
        map(({ symbol, name, market_data }) => {
          const { current_price: { usd } } = market_data
          const { price_change_percentage_1h_in_currency: { usd: lastHour } } = market_data
          return { symbol, name, usd, lastHour }
        }),
      ).subscribe((coin) => {
        this.coinListSubject.value.push(coin)
      })
  }

  getCoinList(): Observable<Coin[]> {
    return this.coinList
  }

  getCryptoMetadata(): void {
    this.apiService.get('/coins/list')
      .pipe(
        map((crypto: CoinListPayload[]) => crypto.map(({ id, symbol }) => ({ [symbol]: id }))),
        // finalize(() => this.add('zoc'))
      )
      .subscribe((crypto: CoinMetadata[]) => this.coinsMetadata.next(crypto))
  }

}
