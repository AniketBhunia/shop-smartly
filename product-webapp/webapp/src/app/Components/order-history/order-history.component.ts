// import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from 'src/app/Services/order-history.service';
import { ShoppingCartItem } from 'src/app/cartModel';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/Services/alert-service';
import { ReviewService } from 'src/app/Services/review.service';
import { Order } from 'src/app/data.types';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})

export class OrderHistoryComponent implements OnInit {
  ReviewForm!: FormGroup;
  productId: number = 0;
  writeReview: string = ''; // two way data binding
  fileName!: File;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('previewImage') previewImage!: ElementRef;
  MAX_FILE_SIZE: number = 1 * 1000 * 1000;
  rating!: number;
  x = false;
  onClick() {
    this.x = true;
    // console.log("ghjh")
  }
  cartList: ShoppingCartItem[] = [];
  orderList: Order[] = [];
  constructor(
    private AlertService: AlertService,
    private reviewService: ReviewService,
    // private OrderHistoryService: OrderHistoryService
    private cartService : ShoppingCartService
  ) { }

  ngOnInit(): void {
    // Example usage of the OrderService methods
    // this.createOrder();
    // this.getOrderById(123); // Replace with an actual order ID
    // this.deleteOrderById(123); // Replace with an actual order ID

    // const cartData: ShoppingCartItem[] = [
    //   {
    //     cartId: 1,
    //     userId: 1,
    //     productId: 'prod123',
    //     productName: 'Product 1',
    //     cartTotalPrice: 100,
    //     productImage: '../assets/iphone_image.jpeg',
    //     productPrice: 50,
    //     productQuantity: 2
    //   },
    //   {
    //     cartId: 2,
    //     userId: 1,
    //     productId: 'prod456',
    //     productName: 'Product 2',
    //     cartTotalPrice: 150,
    //     productImage: 'image-url-2',
    //     productPrice: 75,
    //     productQuantity: 2
    //   }
    //   // Add more cart items as needed
    // ];
    // this.getOrderHistoryByCart(this.orders);
    const savedCartItems = localStorage.getItem('cartList');
    if (savedCartItems) {
      this.cartList = JSON.parse(savedCartItems);
    }
    this.createOrder()
  }

  createOrder(): void {
    const currentDateTime = new Date();
    const order: Order = {
      orderID: this.generateOrderId(),
      orderStatus : 'Ordered',
      items: [...this.cartList], // Create a copy of cartList
      totalAmount: this.calculateTotalAmount(),
      orderDate: currentDateTime,
    };
  
    // Save the order to the orderList
    this.orderList.push(order);
    console.log(this.orderList);
  
    localStorage.setItem('orderList', JSON.stringify(this.orderList));
  }
  
  
      // Clear the cart and update localStorage
      // this.cartList = [];

      // this.cartService.deleteCartItemByCartId(this.cartList[0].cartId).subscribe((res)=>{
      //   if(res){
      //     console.log(res);
      //     // localStorage.removeItem('cartList');
      //   }
      // })

    calculateTotalAmount(): number {
      // Logic to calculate total amount from cartList
      return this.cartList.reduce((total, item) => total + (item.productQuantity * item.productPrice), 0);
    }

  // createOrder(): void {
  //   const order = {/* your order data here */};
  //   this.OrderHistoryService.createOrder(order)
  //     .subscribe(response => {
  //       console.log('Order created:', response);
  //     }, error => {
  //       console.error('Error creating order:', error);
  //     });
  // }

  // getOrderById(orderId: number): void {
  //   this.OrderHistoryService.getOrderById(orderId)
  //     .subscribe(response => {
  //       console.log('Order details:', response);
  //     }, error => {
  //       console.error('Error fetching order details:', error);
  //     });
  // }

  // deleteOrderById(orderId: number): void {
  //   this.OrderHistoryService.deleteOrderById(orderId)
  //     .subscribe(response => {
  //       console.log('Order deleted:', response);
  //     }, error => {
  //       console.error('Error deleting order:', error);
  //     });
  // }

  // getOrderHistoryByCart(cartData: any): void {
  //   this.OrderHistoryService.getOrderHistoryByCart(cartData)
  //     .subscribe(response => {
  //       console.log('Order history:', response);
  //     }, error => {
  //       console.error('Error fetching order history:', error);
  //     });
  // }

  generateOrderId(): number {
    // Logic to generate a unique order ID
    return Math.floor(Math.random() * 1000);
  }
  // Set product Id 
  reviewYourOrder(val: any) {
    console.log(val, " val")
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

  saveYourReview(productId: number) {
    if (this.rating && this.fileName && this.writeReview) {
      const demo = {
        productId: productId,
        user_name: localStorage.getItem('name'),
        product_review_rating: this.rating.toString(),
        product_review_description: this.writeReview,
        user_id: localStorage.getItem('userId'),
        review_id: Math.floor(Math.random() * 500),
      };
  
      this.reviewService
        .postReview(JSON.stringify(demo), this.fileName)
        .subscribe((res) => {
          Swal.fire({
            icon: 'success',
            title: 'Review Added',
            text: 'Your review has been successfully added.',
          });
        });
    }
    console.log("Review saved for product with ID: " + productId);
  }

  toggleOrderExpansion(cart: ShoppingCartItem): void {
    cart.expanded = !cart.expanded;
    if (cart.expanded) {
      cart.showReviewForm = false;
    }
  }
  canAddReview(cart:ShoppingCartItem):void{
    cart.canAddReview = !cart.canAddReview
  }

  toggleReviewForm(cart: ShoppingCartItem): void {
    cart.showReviewForm = !cart.showReviewForm;
  }
}