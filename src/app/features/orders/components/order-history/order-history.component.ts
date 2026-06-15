import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
 orders:any[]=[];
 restaurant:any[]=[];
  constructor(private http: HttpClient) {}
  isMobile = window.innerWidth <= 768;

getDisplayItems(items: any[]): any[] {
  return items.slice(0, this.isMobile ? 1 : items.length);
}
ngOnInit() {

  forkJoin({
    orders: this.http.get<any[]>('http://localhost:3000/orders'),
    restaurants: this.http.get<any[]>('http://localhost:3000/restaurants')
  }).subscribe(({ orders, restaurants }) => {

   this.orders = orders.map(order => {

  const restaurant = restaurants.find(
    r => Number(r.id) === Number(order.restaurantId)
  );

  return {
    ...order,
    restaurantName: restaurant?.name,
    image: restaurant?.image
  };

});
    console.log(restaurants);
console.log(orders);

  });

}
}