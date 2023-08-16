import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../data.types';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private wishList: Product[] = []; 
  constructor(private http:HttpClient) { }
  productList() {
    return this.http.get<any>('http://localhost:8081/api/v1/product/all_products');
  }

  getProductByID(product_id: string) {
    return this.http.get<any>(`http://localhost:8081/api/v1/product/${product_id}`)
  }
  
  addProduct(productData: string, productImage: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('product', productData);
    formData.append('image', productImage);

    // Define headers
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data'); // Make sure this matches the server's expected content type

    // Send the FormData in the request
    return this.http.post<any>('http://localhost:8081/api/v1/product/add_product', formData);
  }
  updateProduct(product_id: number,productData:string ,image:File){
    const formData: FormData = new FormData();
    formData.append('productData', productData);
    formData.append('image', image);
    return this.http.put<any>(`http://localhost:8081/api/v1/product/update_product/${product_id}`, formData);
  }

  deleteProduct(product_id:number){
    return this.http.delete<any>(`http://localhost:8081/api/v1/delete_product/${product_id}`)
  }

  getProductBySellerId(seller_id:number){
    return this.http.get<any>(`http://localhost:8081/api/v1/product/${seller_id}`)
  }

  popularProducts() {
    return this.http.get<any>('http://localhost:8081/api/v1/product?limit=8');
  }
  popularProductsForHome(){
    return this.http.get<any>('http://localhost:8081/api/v1/product?limit=7');
  }

  searchByName(name : any ){
    return this.http.get<any>(`http://localhost:8081/api/v1/product/search/${name}`)
  }
  searchByCategory(category : any ){
    return this.http.get<any>(`http://localhost:8081/api/v1/product/byCategory/${category}`)
  }
  searchByBrand(productBrand:any){
    return this.http.get<any>(`http://localhost:8081/api/v1/product/byBrand/${productBrand}`)
  }
  
  // addToWishlist(product: Product) {
  //   const storedWishlist = localStorage.getItem('wishList');
  //   if (storedWishlist) {
  //     const existingWishlist: Product[] = JSON.parse(storedWishlist);
  //     existingWishlist.push(product);
  //     localStorage.setItem('wishList', JSON.stringify(existingWishlist));
  //   } else {
  //     const newWishlist: Product[] = [product];
  //     localStorage.setItem('wishList', JSON.stringify(newWishlist));
  //   }
  // }
  
  // // getWishList(): Product[] {
  // //   return this.wishList;
  // //   // console.log(this.wishList);
    
  // // }
  // isInWishList(item: any): boolean {
  //   return this.wishList.some(wishListItem => wishListItem.product_id === item.product_id);
  // }



}
