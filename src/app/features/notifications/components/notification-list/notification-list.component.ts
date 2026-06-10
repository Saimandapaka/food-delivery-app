import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '@features/notifications/models/notification';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  selectedFilter = 'all'; 
   filters = [
    { label: 'All', value: 'all' },
    { label: 'Orders', value: 'orders' },
    { label: 'Offers', value: 'offers' },
    { label: 'Updates', value: 'updates' }
  ];
     constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadNotifications();
  }
  // api calling 
  loadNotifications(): void {
    this.http.get<any[]>('http://localhost:3000/notifications')
      .subscribe(data => {
        this.notifications = data;
        this.filteredNotifications = data;
      });
  }
  // unread notifications with length 
  get unreadCount(): number {
  return this.notifications.filter(n => !n.isRead).length;
}
//  single notification
 markSingleAsRead(id: number): void {
  this.notifications = this.notifications.map(n =>
    n.id === id ? { ...n, isRead: true } : n
  );

  this.applyFilter(this.selectedFilter);
}
  markAllAsRead(): void {
  this.notifications = this.notifications.map(n => ({
    ...n,
    isRead: true
  }));

  this.applyFilter(this.selectedFilter);
}
//  filter logic for orders offers and updates
  applyFilter(filter: string): void {
    this.selectedFilter = filter;

    if (filter === 'all') {
      this.filteredNotifications = this.notifications;
    } else {
      this.filteredNotifications = this.notifications.filter(
        n => n.type === filter
      );
    }
  }
}
