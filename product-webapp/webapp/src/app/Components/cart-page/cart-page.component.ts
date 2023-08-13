// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/cartModel';
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
export class CartComponent implements OnInit{
  cartList !: ShoppingCartItem[];
  shoppingCart: ShoppingCartService; 
  amount!:number;

 calculateGrandTotal(): number {
  return this.shoppingCart.calculateGrandTotal(this.cartList);
}
  constructor(private cartService: ShoppingCartService) {
    this.shoppingCart = cartService;
   
  }
  ngOnInit(): void {
    this.getCartByID(21)
  }

  getCartByID(cart_id:any){
    this.cartService.getUserData(cart_id).subscribe((res:any)=>{
      this.cartList = res
      console.log(this.cartList);
      console.log(this.cartList.length)
    })
  }

  updateCartItem(cartItem: ShoppingCartItem) {
    const updatedItem: ShoppingCartItem = {
      ...cartItem,
      cartTotalPrice: cartItem.productPrice * cartItem.productQuantity,
    };
    this.shoppingCart.updateCartItem(updatedItem);
  }

  deleteCartItem(productId: any) {
    this.shoppingCart.deleteCartItem(productId).subscribe((res)=>{
      if (res == true ){
        alert("Product Deleted Successfully")
      }
    })
    window.location.reload()
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


