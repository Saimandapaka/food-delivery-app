import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
  
    getAll() {
      return this.http.get<any[]>(`${this.apiUrl}/users`);
    }
    getAllAddress() {
      return this.http.get<any[]>(`${this.apiUrl}/addresses`);
    }
    postAddress(address:any){
      return this.http.post<any[]>(`${this.apiUrl}/addresses`,address);
    }
     deleteAddress(id: number) {
       return this.http.delete<any[]>(`${this.apiUrl}/addresses/${id}`);
 
  }
  patchAddress(id:number,address:any){
    return this.http.patch(`${this.apiUrl}/addresses/${id}`, address);
   
  }
  patchuser(id:number,user:any){
    console.log(user);
    return this.http.patch(`${this.apiUrl}/users/${id}`, user);
  }
} 
