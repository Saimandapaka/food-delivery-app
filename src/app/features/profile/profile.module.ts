import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersModule } from '@features/orders/orders.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { NotificationsModule } from '@features/notifications/notifications.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    OrdersModule,
    NotificationsModule
  ]
})
export class ProfileModule { }
