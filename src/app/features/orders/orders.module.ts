import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import{OrderHistoryComponent} from './components/order-history/order-history.component';
import{TimeAgoPipe} from '@shared/pipes/time-ago.pipe';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import{SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [
    OrderHistoryComponent,OrderDetailComponent,OrderPlacedComponent
    
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TimeAgoPipe,SharedModule

  ]
})
export class OrdersModule { }
