import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoinService } from '../core/services/coin.service';
import { COIN_COLUMNS } from '../core/config/coin-columns';
import { tap } from 'rxjs/operators';
import { SnackBarService } from '../core/services/snackbar.service';
import { COIN_ADDED, COIN_DUPLICATE, COIN_NOT_FOUND, COINS_UPDATED } from '../core/config/snack-bar';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent {

  control = new FormControl('')
  updated = false
  coins$ = this.coinService.getCoinList().pipe(
    tap((coins) => {
      if (coins.length > 0) {
        this.snackBarService.open(this.updated ? COIN_ADDED : COINS_UPDATED)
        setTimeout(() => this.updated = true, 300)
      }
      this.isLoading = false;
      this.control.enable()
    })
  )

  coinColumns = COIN_COLUMNS
  isLoading = true;

  addCoin() {
    this.isLoading = true;
    this.control.disable()
    try {
      this.coinService.addCoin(this.control.value)
      this.updated = true
    } catch (e) {
      this.snackBarService.open(e === 'NOT_FOUND' ? COIN_NOT_FOUND : COIN_DUPLICATE)
      this.isLoading = false;
      this.control.enable()
    }
    this.control.setValue('')
  }

  resetCoinList() {
    this.coinService.resetCoinList()
  }

  constructor(private coinService: CoinService, private snackBarService: SnackBarService) { }
}
