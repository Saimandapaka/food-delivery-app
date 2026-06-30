import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {
 private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
    discounttype:string='';
    discount:number=0;
    updatediscount(a:any){
      this.discount=a
      return this.discount;
    }
  getAlloffers() {
      return this.http.get<any[]>(`${this.apiUrl}/offers`);
    }
}
