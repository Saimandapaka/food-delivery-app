import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import{OrderHistoryComponent} from './components/order-history/order-history.component';
import{TimeAgoPipe} from '@shared/pipes/time-ago.pipe';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
@NgModule({
  declarations: [
    OrderHistoryComponent,OrderDetailComponent
    
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    TimeAgoPipe

  ],
  exports: [OrderHistoryComponent]
})
export class OrdersModule { }
