import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { CoinService } from './services/coin.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from './interceptors/header.interceptor';
import { SnackBarService } from './services/snackbar.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    ApiService,
    SnackBarService,
    CoinService
  ]
})
export class CoreModule { }
