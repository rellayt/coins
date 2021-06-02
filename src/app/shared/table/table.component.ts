import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { COIN_COLUMNS } from '../../core/config/coin-columns';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  columnsView: string[] = COIN_COLUMNS;
  @Input() dataSource$ = of([]);

  ngOnInit(): void {
  }

}
