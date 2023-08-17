// // shopping-cart.service.ts

// import { EventEmitter, Injectable } from '@angular/core';
// import { ShoppingCartItem } from '../cartModel';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Product } from '../data.types';

// @Injectable({
//   providedIn: 'root'
// })
// export class ShoppingCartService {

//  private baseUrl = 'http://localhost:8080'; // Your backend API URL
//  cartData = new EventEmitter<ShoppingCartItem[] | []>();

//   constructor(private http: HttpClient) { }

//   addToCart(userId: number, productId: number): Observable<any> {
//     const cart = { userId, addedProductList: [{ productId }] };
//     return this.http.post(`${this.baseUrl}/cart/add`, cart);
//   }

//   getCart(): Observable<any> {
//     return this.http.get(`http://localhost:8081/cart/getall`);
//   }

//   deleteFromCart(cartId: number): Observable<any> {
//     return this.http.delete(`http://localhost:8081/cart/${cartId}`);
//   }

//   getUserData(cartId: number):Observable<any>{
//     return this.http.get(`http://localhost:8081/cart/${cartId}`)
//   }
//   // calculateGrandTotal(): number {
//   //   let total = 0;
//   //   for (const item of this.ShoppingCartItem) {
//   //     total += item.unitPrice * item.quantity;
//   //   }
//   //   return total;
//   // }

//   // updateCartItem(updatedItem: ShoppingCartItem) {
//   //   // Implement the logic to update a cart item
//   //   const index = this.cartItems.findIndex(item => item.product.id === updatedItem.product.id);
//   //   if (index !== -1) {
//   //     this.cartItems[index] = updatedItem;
//   //   }
//   // }

//   // deleteCartItem(itemToDelete: ShoppingCartItem) {
//   //   // Implement the logic to delete a cart item
//   //   this.cartItems = this.cartItems.filter(item => item.product.id !== itemToDelete.product.id);
//   // }



//   localAddToCart(data: Product) {
//     let cartData = [];
//     let localCart = localStorage.getItem('localCart');
//     if (!localCart) {
//       localStorage.setItem('localCart', JSON.stringify([data]));
//       this.cartData.emit([this.convertToShoppingCartItem(data)]); // Convert to ShoppingCartItem
//     } else {
//       cartData = JSON.parse(localCart);
//       cartData.push(data);
//       localStorage.setItem('localCart', JSON.stringify(cartData));
//       this.cartData.emit(this.convertToShoppingCartItems(cartData)); // Convert to ShoppingCartItem array
//     }
//   }

//   removeItemFromCart(productID: number) {
//     let cartData = localStorage.getItem('localCart');
//     if (cartData) {
//       let items: Product[] = JSON.parse(cartData);
//       items = items.filter((item: Product) => productID !== item.product_id);
//       localStorage.setItem('localCart', JSON.stringify(items));
//       this.cartData.emit(this.convertToShoppingCartItems(items)); // Convert to ShoppingCartItem array
//     }
//   }

//   addtoCart(data:ShoppingCartItem) {
//     // Assuming you need to convert data to ShoppingCartItem format before sending
//     const shoppingCartItem = this.convertToShoppingCartItemData(data);
//     return this.http.post('http://localhost:3000/cart', shoppingCartItem);
//   }
//   private convertToShoppingCartItem(product: Product): ShoppingCartItem {
//     return {
//       CartId: '',
//       UserId: '',
//       ProductId: product.product_id.toString(),
//       CartTotalPrice: 0,
//       CartImage: product.product_image.toString(), // Update with actual image URL if needed
//       ProductPrice: product.product_current_price,
//       ProductQuantity: 1 // Assuming 1 as default quantity when adding to cart
//     };
//   }

//   private convertToShoppingCartItems(products: Product[]): ShoppingCartItem[] {
//     return products.map(product => this.convertToShoppingCartItem(product));
//   }

//   private convertToShoppingCartItemData(data:any): ShoppingCartItem {
//     // Convert CartData to ShoppingCartItem format here
//     // Modify this function based on your actual data structure
//     return {
//       CartId: '',
//       UserId: '',
//       ProductId: data.productId.toString(),
//       CartTotalPrice: 0,
//       CartImage: '', // Update with actual image URL if needed
//       ProductPrice: data.productPrice,
//       ProductQuantity: data.productQuantity
//     };
//   }
// }

// shopping-cart.service.ts

import { EventEmitter, Injectable } from '@angular/core';
import { ShoppingCartItem } from '../cartModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private baseUrl = 'http://localhost:8082'; // Your backend API URL
  cartData = new EventEmitter<ShoppingCartItem[] | []>();

  constructor(private http: HttpClient) {}

  addToCart(data:ShoppingCartItem): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/add`,data);
  }

  getCart(): Observable<ShoppingCartItem[]> {
    return this.http.get<ShoppingCartItem[]>(`${this.baseUrl}/cart/getall`);
  }

  deleteFromCart(cartId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${cartId}`);
  }

  getUserData(cartId: number): Observable<ShoppingCartItem> {
    return this.http.get<ShoppingCartItem>(`${this.baseUrl}/cart/${cartId}`);
  }

  updateCartItem(productId: number, newQuantity: number): Observable<ShoppingCartItem[]> {
    const url = `${this.baseUrl}/cart/update?productId=${productId}&newQuantity=${newQuantity}`;
    return this.http.put<ShoppingCartItem[]>(url, {});
  }

  deleteCartItem(productId:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/${productId}`);
  }

  deleteCartItemByCartId(cartId:any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cart/item/${cartId}`);
  }
  // After providin the list to order history delete the cart usin this method.

  calculateGrandTotal(cartItems: ShoppingCartItem[]): number {
    let total = 0;
    for (const item of cartItems) {
      total += item.cartTotalPrice * item.productQuantity;
    }
    return total;
  }

}
