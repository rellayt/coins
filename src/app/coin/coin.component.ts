import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CoinService } from '../core/services/coin.service';
import { COIN_COLUMNS } from '../core/config/coin-columns';
import { tap } from 'rxjs/operators';
import { SnackBarService } from '../core/services/snackbar.service';
import { COIN_ADDED, COIN_DUPLICATE, COIN_NOT_FOUND } from '../core/config/snack-bar';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent {

  control = new FormControl('')

  coins$ = this.coinService.getCoinList().pipe(
    tap((coins) => {
      this.isLoading ? this.isLoading = false : null
      coins.length > 0 ? this.snackBarService.open(COIN_ADDED) : null
      this.control.enable()
    })
  )

  coinColumns = COIN_COLUMNS
  isLoading = false;

  addCoin() {
    this.isLoading = true;
    this.control.disable()
    try {
      this.coinService.add(this.control.value)
    } catch (e) {
      this.snackBarService.open(e === 'NOT_FOUND' ? COIN_NOT_FOUND : COIN_DUPLICATE)
      this.isLoading = false;
      this.control.enable()
    }
    this.control.setValue('')
  }

  constructor(private coinService: CoinService, private snackBarService: SnackBarService) { }
}
