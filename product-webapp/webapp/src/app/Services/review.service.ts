import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  reviewList() {
    return this.http.get<any>('http://localhost:8081/api/v1/all_reviews');
  }
  getReviewById(productId: any) {
    return this.http.get<any>(
      `http://localhost:8081/api/v1/reviews/${productId}`
    );
  }

  postReview(productReview: string, image: File) {
    console.log(productReview);
    console.log(image);
    let formData = new FormData();
    formData.append('productReview', productReview);
    formData.append('image', image);

    return this.http.post<any>(
      'http://localhost:8081/api/v1/add_review',
      formData
    );
  }
}
