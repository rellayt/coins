import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() control = new FormControl('')
  @Output() onEnter = new EventEmitter<boolean>()

  constructor() { }

  onKeyup() {
    this.onEnter.emit(true)
  }

}
