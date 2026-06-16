import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartPageComponent,
    CartSummaryComponent,
    FormsModule
  ]
})
export class CartModule { }
