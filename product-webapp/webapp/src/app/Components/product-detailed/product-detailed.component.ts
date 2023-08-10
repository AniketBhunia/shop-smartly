import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { ReviewService } from 'src/app/Services/review.service';
import { Product, Review } from 'src/app/data.types';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css']
})
export class ProductDetailedComponent implements OnInit {
  productData !: Product;
  similarProducts !: Product[];
  categoryValue: string | null = null;
  reviewLists !: Review;
  products2 !: Review[];

  constructor(private productService: ProductService, private activate: ActivatedRoute, private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.getAllReviews();
    let productId = this.activate.snapshot.paramMap.get('productId');
    console.log(productId);

    productId && this.productService.getProductByID(productId).subscribe((res) => {
      this.productData = res
      console.log(this.productData);
      localStorage.setItem('localCart', JSON.stringify([this.productData]));
    })
    const productDataJson = localStorage.getItem('localCart');

    if (productDataJson) {
      const productData = JSON.parse(productDataJson);
      this.categoryValue = productData[0].product_category;
      console.log(this.categoryValue); // Output: Mobile
    } else {
      console.log('No product data found in local storage.');
    }

    this.productService.searchByCategory(this.categoryValue).subscribe((res) => {
      this.similarProducts = res
      console.log(this.similarProducts);
    })

  }
  getAllReviews(){
    this.reviewService.reviewList().subscribe((res : any) => {
      this.reviewLists = res.content;
      console.log(this.reviewLists);
      // this.reviewLists.forEach((review: any) => {
      //   this.products2.push({
      //     ...product,
      //     image: 'data:image/jpeg;base64,' + product.product_image
      //   });
      // });
      // (error: any) => {
      //   console.error('Error fetching products:', error);
      // }
    })
  }
}
