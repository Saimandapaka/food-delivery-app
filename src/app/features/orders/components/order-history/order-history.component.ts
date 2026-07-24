import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
   export class OrderHistoryComponent {
  
   orders: any[] = [];
   isMobile = window.innerWidth <= 768;

   @HostListener('window:resize')
   onResize() {
    this.isMobile = window.innerWidth <= 768;
   }

   constructor(

    private router: Router,
    private orderService: OrderService
   ) {}

   goToOrderDetails(order: any) {
    this.router.navigate(['/orders', order.id]);
   }

   getDisplayItems(items: any[]): any[] {
    return items.slice(0, this.isMobile ? 1 : items.length);
   }

   loadOrders() {

  this.orderService.getOrders()
    .subscribe(({ orders, restaurants }) => {

      // Update status of every order
      orders.forEach((order: any) => {

        // Skip cancelled orders
        if (order.status === 'cancelled') {
          return;
        }

        const currentStatus = this.orderService.getCurrentStatus(order.timeline);

        if (currentStatus && currentStatus !== order.status) {

          order.status = currentStatus;

          this.orderService.updateOrder(order.id, {
            status: currentStatus,
            deliveredAt:
              currentStatus === 'delivered'
                ? new Date().toISOString()
                : null
          }).subscribe();

        }

      });

      // Display orders
      this.orders = orders
        .map(order => {

          const restaurant = restaurants.find(
            r => Number(r.id) === Number(order.restaurantId)
          );

          return {
            ...order,
            restaurantName: restaurant?.name,
            image: restaurant?.image
          };

        })
        .filter(order =>
          new Date() >= new Date(order.placedAt)
        )
        .sort((a: any, b: any) =>
          new Date(b.placedAt).getTime() -
          new Date(a.placedAt).getTime()
        );

    });

}

  ngOnInit() {

    // Initial load
    this.loadOrders();

    // Check every second whether any future order
    // should now become visible
    setInterval(() => {
      this.loadOrders();
    }, 10000);

  }
}