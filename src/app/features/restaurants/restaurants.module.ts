import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { SharedModule } from '@shared/shared.module';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MenuModule } from '@features/menu/menu.module';
import { MenuCardComponent } from '@features/menu/components/menu-card/menu-card.component';
import { MenuListComponent } from '@features/menu/components/menu-list/menu-list.component';

@NgModule({
  declarations: [RestaurantListComponent,RestaurantCardComponent,RestaurantDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RestaurantsRoutingModule,MenuModule
    
  ]
})
export class RestaurantsModule { }
