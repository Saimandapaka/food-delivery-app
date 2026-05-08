import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuRoutingModule } from './menu-routing.module';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { SharedModule } from '@shared/shared.module';
import { MenuCardComponent } from './components/menu-card/menu-card.component';

@NgModule({
  declarations: [MenuListComponent,MenuCardComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,SharedModule
  ],
  exports:[MenuListComponent,MenuCardComponent]
})
export class MenuModule { }
