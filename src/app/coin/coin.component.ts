import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoinService } from '../core/services/coin.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit {

  constructor(
    private coinService: CoinService
  ) { }

  coins$ = this.coinService.getCoinList()


  @Input() control = new FormControl('')

  ngOnInit(): void { }

  add() {
    this.coinService.add(this.control.value)
    this.control.setValue('')
    this.coins$ = this.coinService.getCoinList()
  }
}
