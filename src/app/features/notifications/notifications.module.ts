import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { Notification } from './models/notification';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@NgModule({

  declarations: [
    NotificationListComponent,
    NotificationItemComponent
  ],
  imports: [
    CommonModule,NotificationsRoutingModule,TimeAgoPipe
  ],
  


})
export class NotificationsModule {}