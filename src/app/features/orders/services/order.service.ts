import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
   private apiUrl = environment.apiUrl;
   constructor(private http:HttpClient){}
    getOrders() {
    return forkJoin({
      orders: this.http.get<any[]>(`${this.apiUrl}/orders`),
      restaurants: this.http.get<any[]>(`${this.apiUrl}/restaurants`)
    });
  
  }
  
  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/orders/${id}`);
  }
  // Save a new order in db.json
placeOrder(order: any): Observable<any> {

  return this.http.post<any>(
    `${this.apiUrl}/orders`,
    order
  );

}

// to change the status in db.json
  updateOrder(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/orders/${id}`, data);

  }
  getLatestOrder() {
  return this.http.get<any[]>(`${this.apiUrl}/orders`);
}
  
   
getTimeline(placedAt: string, status: string ) {

  
 
  const placed = new Date(placedAt);

  return [
    {
      status: 'placed',
      label: 'Order Placed',
      time: placed.toISOString()
    },
    {
      status: 'confirmed',
      label: 'Order Confirmed by Restaurant',
      time: new Date(
        placed.getTime() + 4 * 60000
      ).toISOString()
    },
    {
      status: 'preparing',
      label: 'Food being prepared',
      time: new Date(
        placed.getTime() + 8 * 60000
      ).toISOString()
    },
    {
      status: 'out_for_delivery',
      label: 'Out for Delivery',
      time: new Date(
        placed.getTime() + 11 * 60000
      ).toISOString()
    },
    {
      status: 'delivered',
      label: 'Delivered',
      time: new Date(
        placed.getTime() + 15 * 60000
      ).toISOString()
    }
  ];
}
getCurrentStatus(timeline: any[]): string {

  if (!timeline?.length) {
    return '';
  }

  const now = new Date();
  let currentStatus = '';

  for (const step of timeline) {

    if (
      step?.time &&
      now >= new Date(step.time)
    ) {
      currentStatus = step.status;
    }

  }

  return currentStatus;
}
}
