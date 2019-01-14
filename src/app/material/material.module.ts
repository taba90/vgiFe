import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatTableModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatDividerModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatDividerModule,

  ]
})
export class MaterialModule { }
