import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/restaurants`);
  }

  getById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.apiUrl}/restaurants/${id}`);

  }
  private selectedRestaurant = new BehaviorSubject<Restaurant | null>(null);

restaurant$ = this.selectedRestaurant.asObservable();
setSelectedRestaurant(restaurant: Restaurant) {
  this.selectedRestaurant.next(restaurant);
}
  getSelectedRestaurant(){
    return this.selectedRestaurant.value;
  }
}