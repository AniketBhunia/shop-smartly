// shopping-cart.service.ts

import { Injectable } from '@angular/core';
import { Product } from '../productModel';
import { ShoppingCartItem } from '../productModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartItems: ShoppingCartItem[] = [
    {
      product: { id: 1, name: 'Headphones', image: 'assets/images.jpeg', price: 10.99 },
      unitPrice: 10.99,
      quantity: 1
    },
    {
      product: { id: 2, name: 'Iphone14', image: 'assets/iphone_image.jpeg', price: 19.99 },
      unitPrice: 19.99,
      quantity: 1
    }
  ];
  constructor(private httpClient:HttpClient){}

  getUserData(id:any){
    return this.httpClient.get(`http://localhost:8081/cart/${id}`)
  }
  calculateGrandTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      total += item.unitPrice * item.quantity;
    }
    return total;
  }

  updateCartItem(updatedItem: ShoppingCartItem) {
    // Implement the logic to update a cart item
    const index = this.cartItems.findIndex(item => item.product.id === updatedItem.product.id);
    if (index !== -1) {
      this.cartItems[index] = updatedItem;
    }
  }

  deleteCartItem(itemToDelete: ShoppingCartItem) {
    // Implement the logic to delete a cart item
    this.cartItems = this.cartItems.filter(item => item.product.id !== itemToDelete.product.id);
  }
}

