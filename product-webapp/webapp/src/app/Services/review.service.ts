import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs"
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  reviewList() {
    return this.http.get<any>('http://localhost:8081/api/v1/all_reviews');
  }
  getReviewById(productId:any){
    return this.http.get<any>(`http://localhost:8081/api/v1/reviews/${productId}`);
  }

  postReview(reviewData : any, reviewImage: any): Observable<any>{ 
    const formData: FormData = new FormData();
    formData.append('productReview', reviewData);
    formData.append('image', reviewImage);
    
    // Send the FormData in the request
    return this.http.post<any>('http://localhost:8081/api/v1/add_review', formData);  }
}
