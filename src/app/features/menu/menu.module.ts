import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuRoutingModule } from './menu-routing.module';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { SharedModule } from '@shared/shared.module';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CartModule } from '@features/cart/cart.module';
import { CartSummaryComponent } from '@features/cart/components/cart-summary/cart-summary.component';
@NgModule({
  declarations: [MenuListComponent,MenuCardComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,SharedModule,CartModule,CartSummaryComponent
  ],
  exports:[MenuListComponent,MenuCardComponent]
})
export class MenuModule { }
