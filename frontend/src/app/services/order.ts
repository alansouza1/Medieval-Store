import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  create(productsIds: number[]): Observable<Order> {
    const token = localStorage.getItem('token');
    // For now the backend is hardcoded to userId 1, but we should send the token if it was validated
    return this.http.post<Order>(this.apiUrl, { productsIds });
  }

  removeProduct(orderId: number, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}/items/${productId}`);
  }
}
