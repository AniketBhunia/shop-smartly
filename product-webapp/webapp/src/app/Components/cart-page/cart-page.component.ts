// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/cartModel';
declare var Razorpay: any;
import Swal from 'sweetalert2';
export class user{
  userName:string = '';
  userEmail:string= '';
  userPassword:string= '';
  userGender:string= '';
  userPhoneNo:string= '';
  userAge:number | null = null;
  //addressList:Address[]
}



@Component({
  selector: 'app-cart',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartComponent implements OnInit{
  cartList !: ShoppingCartItem[];
  shoppingCart: ShoppingCartService; 
  amount !:number;
  INITIAL_PRODUCT_QUANTITY = 1; 
 calculateGrandTotal(): number {
  this.amount =  this.shoppingCart.calculateGrandTotal(this.cartList);
  // console.log(this.amount);
  return this.amount
}
  constructor(private cartService: ShoppingCartService,private router:Router, private _snackBar: MatSnackBar) {
    this.shoppingCart = cartService;
   
  }
  ngOnInit(): void {
    this.getCartByID(21)
    // this.updateCartItem(this.cartList)
  }

  getCartByID(cart_id:any){
    this.cartService.getUserData(cart_id).subscribe((res:any)=>{
      this.cartList = res
      console.log(this.cartList);
      // console.log(this.cartList.length)
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    })
  }

  // updateCartItem(cartList: ShoppingCartItem) {
  //   const updatedCartList: ShoppingCartItem = {
  //     ...cartList,
  //     productQuantity: cartList.productQuantity,
  //     cartTotalPrice: cartList.productPrice * cartList.productQuantity,
  //   };
  //   this.shoppingCart.updateCartItem(updatedCartList);
  //   console.log(updatedCartList);
  //   localStorage.setItem('cartList', JSON.stringify(updatedCartList));
  // }
  updateCartItem(productId: number, newQuantity: number): void {
    this.cartService.updateCartItem(productId, newQuantity)
      .subscribe(
        updatedCartItems => {
          console.log('Cart item updated successfully');
          this.cartList = updatedCartItems; // Update the cart items with the updated list
          // Perform any additional actions after successful update\
          console.log(this.cartList);
          
        },
        error => {
          console.error('Error updating cart item:', error);
          // Handle error scenarios
        }
      );
      console.log(this.cartList);
      
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }

  deleteCartItem(productId: any) {
    this.shoppingCart.deleteCartItem(productId).subscribe((res)=>{
      this.getCartByID(21)
    })
    // window.location.reload()
  }
   payNow() {
    const RozarpayOptions = {
      description: 'Shop Smartly',
      currency: 'USD',
      amount: this.amount*100,
      name: 'Shop Smartly',
      key: 'rzp_test_QKFlV3f8EpzXKc',
      image: '',
      prefill: {
        name: localStorage.getItem('name'),
        email: 'prabhaschandra11@gmail.com',
        phone: '7633915263'
      },
      theme: {
        color: '#6466e3' 
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
      // this.router.navigate(['/orderhistory']);
      this._snackBar.open(`Payment successful! Payment ID: ${paymentid}`, 'Close', {
        duration: 5000, // Duration in milliseconds
        panelClass: ['success-snackbar'], // Add custom CSS class for styling
      });
  
      // Redirect to the order history page after a timeout (e.g., 5 seconds)
      setTimeout(() => {
        this.router.navigate(['/orderhistory']);
      }, 5000); // 5000 milliseconds = 5 seconds
    };

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
    // localStorage.setItem('orderList', JSON.stringify(this.cartList));
    setTimeout(() => {
      Swal.fire({
        title: 'Payment Successful',
        text: 'Thank you for your payment!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the order history page when "OK" is clicked
          this.router.navigate(['/orderhistory']); // Replace '/order-history' with your actual route
        }
      });
    }, 15000); // 15000 milliseconds = 15 seconds // 3000 milliseconds = 3 seconds
  }

  gotoOrders(){
    console.log(localStorage.getItem('cartList'));
    
  }
}


