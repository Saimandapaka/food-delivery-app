import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
 private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  getAlloffers() {
      return this.http.get<any[]>(`${this.apiUrl}/offers`);
    }
}
