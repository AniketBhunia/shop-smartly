// cart.component.ts

import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/productModel';
declare var Razorpay: any;

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
export class CartComponent {
  shoppingCart: ShoppingCartService; 

  get check(): boolean {
    return this.shoppingCart.cartItems.length === 0;
  }
 amount!:number;
  get grandTotal(): number {
   
    return this.shoppingCart.calculateGrandTotal();
  }

  constructor(private cartService: ShoppingCartService) {
    this.shoppingCart = cartService;
    // objects: user = new user;
  }

  updateCartItem(cartItem: ShoppingCartItem) {
    const updatedItem: ShoppingCartItem = {
      ...cartItem,
      unitPrice: cartItem.product.price * cartItem.quantity,
    };
    this.shoppingCart.updateCartItem(updatedItem);
  }

  deleteCartItem(cartItem: ShoppingCartItem) {
    // Implement the logic to delete a cart item
    this.shoppingCart.deleteCartItem(cartItem);
  }
   payNow() {
    const RozarpayOptions = {
      description: 'Shop Smartly',
      currency: 'INR',
      amount: this.amount,
      name: 'Shop Smartly',
      key: 'rzp_test_1URFAbxwfmIO4M',
      image: '',
      prefill: {
        name: 'Prabhas',
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
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
}


