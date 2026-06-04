import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { SharedModule } from '@shared/shared.module';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { CurrencyFormatPipe } from '@shared/pipes/currency-format.pipe';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MenuModule } from '@features/menu/menu.module';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { ReviewsSectionComponent } from './components/reviews-section/reviews-section.component';

@NgModule({
  declarations: [RestaurantListComponent,RestaurantCardComponent,RestaurantDetailsComponent,InfoSectionComponent,ReviewsSectionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RestaurantsRoutingModule,MenuModule
    
  ]
})
export class RestaurantsModule { }
