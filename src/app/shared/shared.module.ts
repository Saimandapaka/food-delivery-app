import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

@NgModule({
  declarations: [
    SpinnerComponent,
    StarRatingComponent,
    ConfirmDialogComponent,
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    StarRatingComponent,
    ConfirmDialogComponent,
    CurrencyFormatPipe,
    CommonModule
  ]
})
export class SharedModule { }