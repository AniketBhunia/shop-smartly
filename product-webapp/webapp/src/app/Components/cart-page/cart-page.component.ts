// cart.component.ts

import { Component } from '@angular/core';
import { ShoppingCartService } from 'src/app/Services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/productModel';

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

  get grandTotal(): number {
    return this.shoppingCart.calculateGrandTotal();
  }

  constructor(private cartService: ShoppingCartService) {
    this.shoppingCart = cartService;
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
}


