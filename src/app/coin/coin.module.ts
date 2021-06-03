import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CoinComponent } from './coin.component';
import { CoinRoutingModule } from './coin-routing.module';

@NgModule({
  declarations: [
    CoinComponent
  ],
  imports: [
    CommonModule,
    CoinRoutingModule,
    SharedModule
  ]
})
export class CoinModule { }
