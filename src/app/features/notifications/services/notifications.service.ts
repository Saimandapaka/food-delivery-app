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
  markSingleAsRead(id: number) {

    const updated = this.notifications.map(n =>

      n.id === id
        ? { ...n, isRead: true }
        : n

    );

    this.notificationSubject.next(updated);

  }

 
  // Mark all as read
 
  markAllAsRead() {

    const updated = this.notifications.map(n => ({
      ...n,
      isRead: true
    }));

    this.notificationSubject.next(updated);

  }

}