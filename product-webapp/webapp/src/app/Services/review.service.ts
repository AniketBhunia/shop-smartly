import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }
  reviewList() {
    return this.http.get<any>('http://localhost:8081/api/v1/all_reviews');
  }
}
