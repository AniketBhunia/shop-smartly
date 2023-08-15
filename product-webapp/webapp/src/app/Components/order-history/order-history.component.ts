import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert-service';
import { ReviewService } from 'src/app/Services/review.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  ReviewForm! : FormGroup; 
  productId: number = 0;
  writeReview: string = ''; // two way data binding
  fileName!: File;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('previewImage') previewImage!: ElementRef;
  MAX_FILE_SIZE: number = 1 * 1000 * 1000;
  rating!: number;

  orders: any[] = [
    {
      id: 1,
      product: 'iPhone',
      image: '../assets/iphone_image.jpeg',
      quantity: 1,
      price: 1000,
    },
    {
      id: 2,
      product: 'Shoes',
      image: '../assets/shoes.jpg',
      quantity: 1,
      price: 30,
    },
    {
      id: 3,
      product: 'Headphone',
      image: '../assets/images.jpeg',
      quantity: 1,
      price: 15,
    },
    // Add more orders as needed
  ];

  constructor(
    private AlertService: AlertService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {}

  // Set product Id 
  reviewYourOrder(val: any) {
    console.log(val ,  " val")
    this.productId = val.id;
  }
  onFileSelected(event: any) {
    this.fileName = event.target.files[0];
    if (this.fileName.size > this.MAX_FILE_SIZE) {
      this.AlertService.message('you can not upload file above 1mb');
      return;
    }
    if (this.fileName.type === 'image/jpeg' || ' image/png') {
      this.previewImage.nativeElement.src = window.URL.createObjectURL(
        this.fileName
      );
      this.AlertService.success('SuccessFully Uploaded');
    } else {
      this.AlertService.error('you can not upload this file');
    }
  }

  onfileChange() {
    console.log(this.writeReview, 'writing review');
    this.fileInput.nativeElement.click();
  }
  selectRating(i: any) {
    this.rating = i + 1;
  }

  saveYourReview() {
 
    if (this.rating && this.productId && this.fileName && this.writeReview) {
      const demo = {
        productId: 25,
        user_name: 'Hello',
        product_review_rating: this.rating.toString(),
        product_review_description: this.writeReview,
        user_id: 44,
        review_id: Math.floor(Math.random() * 500),
      };
        this.reviewService
          .postReview(JSON.stringify(demo), this.fileName)
          .subscribe((res) => {
            this.AlertService.success('successFully Added');
          });
    }
  }
}
