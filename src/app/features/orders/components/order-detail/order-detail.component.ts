import { Component } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { OrderService } from '../../services/order.service';
import {HostListener} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationsService } from '@features/notifications/services/notifications.service';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {
  
  order: any;

  // Current system time
  currentTime = new Date();

  // Used to clear the timer
  intervalId: any;
  selectedReason: string = '';

  constructor(
   
    private route: ActivatedRoute,
    private orderService: OrderService, private notificationsService: NotificationsService
  ) {}
  isMobile = window.innerWidth <= 768;

@HostListener('window:resize')
onResize() {
  this.isMobile = window.innerWidth <= 768;
}

 ngOnInit() {

  // Get Order ID from URL
  const orderId = this.route.snapshot.paramMap.get('id');

  // Load order details
  this.orderService.getOrderById(orderId!).subscribe(order => {

    this.order = order;

    // Generate timeline for active orders
    if (order.status !== 'cancelled') {
      this.order.timeline = this.orderService.getTimeline(
        order.placedAt,
        order.status
      );
    }

  });

  // Check order status every second
  this.intervalId = setInterval(() => {

    // Update current time
    this.currentTime = new Date();

    // Stop if order is not loaded
    if (!this.order) {
      return;
    }

    // Get current status from timeline
    const status = this.orderService.getCurrentStatus(
      this.order.timeline
    );

    // Run only when status changes
    if (status && this.order.status !== status) {

      // Update local status
      this.order.status = status;

     
      // ORDER CONFIRMED NOTIFICATION
  
      if (status === 'confirmed') {

        const notification = {

          userId: 1,

          type: 'orders',

          title: 'Order Confirmed',

          description:
            `${this.order.restaurantName} has confirmed your order.`,

          isRead: false,

          createdAt: new Date().toISOString()

        };

        this.notificationsService.
          addNotification(notification);

      }

     
      // OUT FOR DELIVERY NOTIFICATION

      if (status === 'out_for_delivery') {

        const notification = {

          userId: 1,

          type: 'orders',

          title: 'Out for Delivery',

          description:
            `Your order from ${this.order.restaurantName} is out for delivery.`,

          isRead: false,

          createdAt: new Date().toISOString()

        };

        this.notificationsService
          .addNotification(notification);

      }

      // Update order in db.json
      this.orderService.updateOrder(
        this.order.id,
        {
          status,

          deliveredAt:
            status === 'delivered'
              ? new Date().toISOString()
              : null,

          cancelledAt:
            status === 'cancelled'
              ? new Date().toISOString()
              : null
        }
      ).subscribe();

    }

  }, 1000);

}
  getCancelledTime(): string | null {

  if (this.order?.status !== 'cancelled') {
    return null;
  }

  return this.order.timeline?.[1]?.time || null;

}
showCancelPopup = false;

cancelOrder(){
  this.showCancelPopup = true;
}
clearValue() {
 this.showCancelPopup = false;
  this.selectedReason = '';
}

confirmCancelOrder() {
   
  this.selectedReason = '';
  
  this.order.status = 'cancelled';
  this.order.timeline=[
    {
      status:'placed',
      label:'Order placed',
      time:this.order.placedAt
    },
    {
      status:'cancelled',
      label:'Order cancelled',
      time: new Date().toISOString()
    }

  ];
   // Save changes to db.json
  this.orderService.updateOrder(this.order.id, {
    status: this.order.status,
    timeline: this.order.timeline
  }).subscribe(() => {
   
  });
  
}

  // Returns true if step time has already passed
  isStepCompleted(stepTime: string): boolean {

    if (!stepTime) {
      return false;
    }

    return this.currentTime >= new Date(stepTime);

  }

  
  // Current order status
  getCurrentStatus(): string {

    if (!this.order?.timeline) {
      return '';
    }

    return this.orderService.getCurrentStatus(
      this.order.timeline
    );

  }



}
