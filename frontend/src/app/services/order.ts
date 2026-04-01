import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

export interface Order {
  id: number;
  userId: number;
  productsIds: number[];
  productsNames: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', token || '');
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(productsIds: number[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, { productsIds }, { headers: this.getHeaders() });
  }

  removeProduct(orderId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}/items/${productId}`, { headers: this.getHeaders() });
  }

  completeOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`, { headers: this.getHeaders() });
  }
}
