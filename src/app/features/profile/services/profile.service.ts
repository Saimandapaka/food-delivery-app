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
}
