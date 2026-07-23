import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{BehaviorSubject} from 'rxjs';
import{Notification} from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

 private apiUrl = 'http://localhost:3000/notifications';

  // Stores all notifications
  private notificationSubject =
    new BehaviorSubject<Notification[]>([]);

  // Observable for components
  notifications$ = this.notificationSubject.asObservable();

  constructor(private http: HttpClient) {}


  // Load notifications from API

  loadNotifications() {

  this.http.get<Notification[]>(this.apiUrl)
    .subscribe(data => {

      // Unread first, then newest first
      data.sort((a, b) => {

        if (a.isRead !== b.isRead) {
          return a.isRead ? 1 : -1;
        }

        return new Date(b.createdAt).getTime() -
               new Date(a.createdAt).getTime();
      });

      this.notificationSubject.next(data);

    });

}

  // Current notifications
 
  get notifications() {
    return this.notificationSubject.value;
  }

  // Unread Count

  getUnreadCount(): number {

    return this.notifications.filter(
      n => !n.isRead
    ).length;

  }

  // Mark one notification as read
 // Mark only the clicked notification as read
markSingleAsRead(id: number): void {

  // Find the clicked notification
  const notification = this.notifications.find(n => n.id === id);

  // Stop if notification is not found
  if (!notification) {
    return;
  }

  // Update isRead in db.json
  this.http.patch(`${this.apiUrl}/${id}`, { isRead: true }) .subscribe(() => {

      // Update notification list in the application
      const updatedNotifications = this.notifications.map(n =>n.id === id ? { ...n, isRead: true } : n);

      // Notify all subscribed components
      this.notificationSubject.next(updatedNotifications);

    });

}

  // Mark all as read
  // Mark all notifications as read
markAllAsRead(): void {

  // Update every unread notification in db.json
  this.notifications.forEach(notification => {

    if (!notification.isRead) {

      this.http.patch(
        `${this.apiUrl}/${notification.id}`,
        { isRead: true }
      ).subscribe();

    }

  });

  // Update all notifications in the application
  const updatedNotifications = this.notifications.map(notification => ({
    ...notification,
    isRead: true
  }));

  // Notify all subscribed components
  this.notificationSubject.next(updatedNotifications);

}
// Save notification in db.json
addNotification(notification: any) {

  return this.http.post<Notification>(this.apiUrl, notification)
    .subscribe(savedNotification => {

      // Get current notifications
      const notifications = this.notificationSubject.value;

      // Add the new notification at the beginning
      this.notificationSubject.next([
        savedNotification,
        ...notifications
      ]);

    });

}

}