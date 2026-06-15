import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import{OrderHistoryComponent} from './components/order-history/order-history.component';
import{TimeAgoPipe} from '@shared/pipes/time-ago.pipe';
@NgModule({
  declarations: [
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TimeAgoPipe

  ]
})
export class OrdersModule { }
