import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import {  Output,EventEmitter } from '@angular/core';
import { Notification,Icons } from '@features/notifications/models/notification';
@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css'
})
export class NotificationItemComponent {
 @Input() notification! :Notification
 @Output() markRead = new EventEmitter<number>();
  

  onClick(): void {
    this.markRead.emit(this.notification.id);
  }
   iconMap: Record<string, string> = {
  orders: '🍽️',
  offers: '🎉',
  updates: 'ℹ️'
};
}
