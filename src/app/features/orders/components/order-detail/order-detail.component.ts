import { Component } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { OrderService } from '../../services/order.service';
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

  constructor(
   
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit() {

    // Get order id from URL
    const orderId = this.route.snapshot.paramMap.get('id');

    // Load order
   this.orderService
  .getOrderById(orderId!)
      .subscribe(order => {

        this.order = order;

        // Generate timeline based on placed time and status
       // For cancelled orders, use the timeline from db.json
if (order.status !== 'cancelled') {
  this.order.timeline = this.orderService.getTimeline(
    order.placedAt,
    order.status
  );
}

      });

    // Update every second
    this.intervalId = setInterval(() => {

      this.currentTime = new Date();

      if (!this.order) {
        return;
      }

      // Get current status according to current time
      const status = this.orderService.getCurrentStatus(
        this.order.timeline
      );

      // Update only if status changes
      if (status && this.order.status !== status) {

        this.order.status = status;

        this.orderService.updateOrder(this.order.id,
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
cancelOrder(){
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
