import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  open({ message, action = 'X', type }, duration = 1250) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: type === 'Error' ? 'snackBar-error' : 'snackBar-success',
    });
  }
}
