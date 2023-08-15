// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  amount !:number;

 calculateGrandTotal(): number {
  this.amount =  this.shoppingCart.calculateGrandTotal(this.cartList);
  // console.log(this.amount);
  return this.amount
}
  constructor(private cartService: ShoppingCartService,private router:Router) {
    this.shoppingCart = cartService;
   
  }
  ngOnInit(): void {
    this.getCartByID(21)
  }

  getCartByID(cart_id:any){
    this.cartService.getUserData(cart_id).subscribe((res:any)=>{
      this.cartList = res
      console.log(this.cartList);
      // console.log(this.cartList.length)
      localStorage.setItem('cartList', JSON.stringify(this.cartList));
    })
  }

  updateCartItem(cartList: ShoppingCartItem) {
    const updatedCartList: ShoppingCartItem = {
      ...cartList,
      cartTotalPrice: cartList.productPrice * cartList.productQuantity,
    };
    this.shoppingCart.updateCartItem(updatedCartList);
    localStorage.setItem('cartList', JSON.stringify(updatedCartList));
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
      key: 'rzp_test_hSvndswhybubtG',
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
      // this.router.navigate(["/orderhistory"])
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
  }
}


