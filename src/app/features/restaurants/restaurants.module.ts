import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { SharedModule } from '@shared/shared.module';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';


@NgModule({
  declarations: [RestaurantListComponent,RestaurantCardComponent],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    SharedModule
  ]
})
export class RestaurantsModule { }
