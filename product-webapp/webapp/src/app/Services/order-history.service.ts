import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private apiUrl = 'http://localhost:8082'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  createOrder(order: any): Observable<any> {
    const url = `${this.apiUrl}/order/create`;
    return this.http.post(url, order);
  }

  getOrderById(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/order/${orderId}`;
    return this.http.get(url);
  }

  deleteOrderById(orderId: number): Observable<any> {
    const url = `${this.apiUrl}/order/${orderId}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  // Implement the function to get order history using cart data
  getOrderHistoryByCart(cartData: any): Observable<any> {
    // Modify the URL and request as needed to fetch order history using cart data
    const url = `${this.apiUrl}/order/history`; // Change this URL
    return this.http.post(url, cartData);
  }
}
