import { ProductService } from 'src/app/Services/product.service';
import { ReviewService } from 'src/app/Services/review.service';
import { Product, Review } from 'src/app/data.types';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ShoppingCartItem } from 'src/app/cartModel';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css'],
})
export class ProductDetailedComponent implements OnInit {
  productData!: Product;
  similarProducts!: Product[];
  categoryValue: string | null = null;
  reviewLists!: Review;
  reviewData!: Review[];
  reviewForm!: FormGroup;
  items: any[] = [];
  allPages: any[] = [];
  cartTotalPrice !: number;
  INITIAL_PRODUCT_QUANTITY = 1; 
  constructor(
    private productService: ProductService,
    private activate: ActivatedRoute,
    private reviewService: ReviewService,
    private shoppingCartService : ShoppingCartService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getAllReviewsAndLimitPages();
    let productId = this.activate.snapshot.paramMap.get('productId');
    this.getReviewByProductId(productId);

    productId &&
      this.productService.getProductByID(productId).subscribe((res) => {
        this.productData = res;
        console.log(this.productData);
        localStorage.setItem('localCart', JSON.stringify([this.productData]));
      });
    const productDataJson = localStorage.getItem('localCart');

    if (productDataJson) {
      const productData = JSON.parse(productDataJson);
      this.categoryValue = productData[0].product_category;
      console.log(this.categoryValue); // Output: Mobile
    } else {
      console.log('No product data found in local storage.');
    }
    this.productService
      .searchByCategory(this.categoryValue)
      .subscribe((res) => {
        this.similarProducts = res;
      });
        // Reload the window after the specified delay
  }


  getAllReviewsAndLimitPages() {
    this.reviewService.reviewList().subscribe((res: any) => {
      this.reviewLists = res.content;
      console.log(this.reviewLists);
      let pageNumbers: any = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pageNumbers.push(i);
      }
      this.allPages = pageNumbers;

    });
  }
  // get review for productId

  value = '';

  selectedValue(value: any): void {
    console.log('value', value);
    this.value = value;
  }


  reviewsPerPage: number = 4; // Number of reviews per page
  currentPage: number = 1;

  // Calculate the total number of pages
  get totalPages(): number {
    return Math.ceil(this.reviewData.length / this.reviewsPerPage);
  }

  // Get the array of reviews for the current page
  get pagedReviews(): any[] {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    return this.reviewData.slice(startIndex, endIndex);
  }


  limitedItems: any[] = [];
  // Change the current page and update the displayed reviews
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.limitedItems = this.pagedReviews;
      console.log(this.pagedReviews, ' this is paged reviews');
    }
  }
  getReviewByProductId(productId: any) {
    this.reviewService.getReviewById(productId).subscribe((res: any) => {
      this.reviewData = res;
      let newData = this.reviewData;
      newData = this.pagedReviews;
      this.limitedItems = this.pagedReviews;
      console.log(this.limitedItems, ' limiteditems');
    });
  }
  createReview() {
    const data = {
      productReview: {

      },
      image: '',
    };
    // this.reviewService
    //   .postReview(data.productReview, data.image)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
  addReview(data: any) {
    console.log(data)
    let newData = JSON.stringify(data)
    console.log(newData);
  }


  // +++++++++++++++++++++++++++++++++++++++ Add to Cart
// Global initial value for product quantity

addToCart() {
  const productDataJson = localStorage.getItem('localCart');

  if (productDataJson) {
    const productData = JSON.parse(productDataJson);
    const existingCartDataJson = localStorage.getItem('cartList');
    let cartData: ShoppingCartItem[] = []; // Explicitly define the type

    if (existingCartDataJson) {
      cartData = JSON.parse(existingCartDataJson) as ShoppingCartItem[]; // Cast the parsed JSON to the expected type
      const existingProductIndex = cartData.findIndex(item => item.productId === productData[0].product_id);

      if (existingProductIndex !== -1) {
        // Product already exists in the cart, increase the quantity
        this.INITIAL_PRODUCT_QUANTITY += 1;
      } else {
        const userId = localStorage.getItem('userId');
        // Product doesn't exist in the cart, add it
        const newCartItem: ShoppingCartItem = {
          cartId: 21,
          userId: userId,
          productId: productData[0].product_id,
          productName: productData[0].product_name,
          cartTotalPrice: productData[0].product_discount_price,
          productImage: productData[0].product_image,
          productPrice: productData[0].product_discount_price,
          productQuantity: this.INITIAL_PRODUCT_QUANTITY,
          expanded : false,
          showReviewForm: false,
          canAddReview: false // Use the global initial value
        };
        cartData.push(newCartItem);
        this.shoppingCartService.addToCart(newCartItem).subscribe((res) => {
          // Handle the response if needed
        });
      }
    } else {
      // Cart is empty, add the product directly
      const userId = localStorage.getItem('userId');
      const newCartItem: ShoppingCartItem = {
        cartId: 21,
        userId: userId,
        productId: productData[0].product_id,
        productName: productData[0].product_name,
        cartTotalPrice: productData[0].product_discount_price,
        productImage: productData[0].product_image,
        productPrice: productData[0].product_discount_price,
        productQuantity: this.INITIAL_PRODUCT_QUANTITY,
        expanded : false,
        showReviewForm: false,
        canAddReview: false // Use the global initial value
      };
      cartData.push(newCartItem);
      this.shoppingCartService.addToCart(newCartItem).subscribe((res) => {
        // Handle the response if needed
      });
    }

    localStorage.setItem('cartList', JSON.stringify(cartData));

    Swal.fire({
      title: 'Added In Your Cart',
      text: 'Product Added in Your Cart',
      icon: 'success',
      confirmButtonText: 'Okay'
    });

    this.router.navigate(['/mycart']);
  }
}

  
  

  // total() {
  //   this.shoppingCartService.calculateGrandTotal()
  // }


}
function showAlert() {
  throw new Error('Function not implemented.');
}

