import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}

  

    from=0;
  mode = new BehaviorSubject<'list' | 'add' | 'edit'>('list');

  selectedAddress:any=null;



    getAll() {
      return this.http.get<any[]>(`${this.apiUrl}/users`);
    }
    getAllAddress() {
      return this.http.get<any[]>(`${this.apiUrl}/addresses`);
    }
    deleteAddress(id: number) {
       return this.http.delete<any[]>(`${this.apiUrl}/addresses/${id}`);
 
  }
}
