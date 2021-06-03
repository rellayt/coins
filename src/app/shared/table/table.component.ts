import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() columnsView: string[] = [];
  @Input() dataSource$ = of([])

  constructor() { }

}
