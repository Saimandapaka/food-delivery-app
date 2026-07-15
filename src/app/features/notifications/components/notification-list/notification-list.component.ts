import { Component } from '@angular/core';
import{NotificationsService} from '@features/notifications/services/notifications.service';
import { Notification } from '@features/notifications/models/notification';
@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
   // Stores all notifications
  notifications: Notification[] = [];

  // Stores filtered notifications (All, Orders, Offers...)
  filteredNotifications: Notification[] = [];

  // Default selected filter
  selectedFilter = 'all';

  // Filter buttons
  filters = [
    { label: 'All', value: 'all' },
    { label: 'Orders', value: 'orders' },
    { label: 'Offers', value: 'offers' },
    { label: 'Updates', value: 'updates' }
  ];

  // Inject Notification Service
  constructor(
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {

    // Load notifications from API
    this.notificationService.loadNotifications();

    // Subscribe to notifications from the service
    this.notificationService.notifications$
      .subscribe(data => {

        // Store all notifications
        this.notifications = data;

        // Apply current filter
        this.applyFilter(this.selectedFilter);

      });

  }

  // Number of unread notifications
  get unreadCount(): number {

    return this.notificationService.getUnreadCount();

  }

  // Mark one notification as read
  markSingleAsRead(id: number): void {

    this.notificationService.markSingleAsRead(id);

  }

  // Mark all notifications as read
  markAllAsRead(): void {

    this.notificationService.markAllAsRead();

  }

  // Filter notifications
  applyFilter(filter: string): void {

    this.selectedFilter = filter;

    if (filter === 'all') {

      this.filteredNotifications = this.notifications;

    } else {

      this.filteredNotifications =
        this.notifications.filter(
          n => n.type === filter
        );

    }

  }
}
