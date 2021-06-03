import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const MaterialComponents = [
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatSnackBarModule
];

@NgModule({
  imports: [
    MatRippleModule,
    MaterialComponents,
  ],
  exports: [MaterialComponents]
})
export class MaterialModule { }
