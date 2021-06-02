import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {


  @Input() type: string = 'button'
  @Input() isLoading: boolean = false
  @Input() isDisabled: boolean = false

  @Output() onClick = new EventEmitter<boolean>();

  clicked() {
    this.onClick.emit(true);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
