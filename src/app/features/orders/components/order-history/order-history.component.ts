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

   // Load orders from API
    loadOrders() {

     this.orderService.getOrders()
     .subscribe(({ orders, restaurants }) => {
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

        // Show order only after placedAt time is reached
         .filter(order =>
    new Date() >= new Date(order.placedAt)
  )

  // Newest order first
   .sort((a:any, b:any) =>
    new Date(b.placedAt).getTime() -new Date(a.placedAt).getTime());

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