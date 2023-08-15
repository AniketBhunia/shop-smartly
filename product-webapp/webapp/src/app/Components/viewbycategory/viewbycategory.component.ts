import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-viewbycategory',
  templateUrl: './viewbycategory.component.html',
  styleUrls: ['./viewbycategory.component.css']
})
export class ViewbycategoryComponent implements OnInit{
  constructor(private productService:ProductService,private activateRoute: ActivatedRoute){}
  similarProducts !: Product[];
  categoryValue : any
  wishList : Product[] = []

  ngOnInit(): void {
    this.categoryValue = this.activateRoute.snapshot.paramMap.get('category')
    this.fetchCateory(this.categoryValue)
    // this.getItemsOfWishList()
    // console.log(this.wishList);
    
    // this.categoryValue && this.productService.searchByCategory(this.categoryValue).subscribe((res) => {
    //   this.similarProducts = res
    //   console.log(this.similarProducts);
    // })
  }

  fetchCateory(category:string){
    this.productService.searchByCategory(category).subscribe((res) => {
      this.similarProducts = res
      console.log(this.similarProducts);
    })
  }
  // addItemToWishList(product: Product) {
  //   this.productService.addToWishlist(product);
  // }

  // getItemsOfWishList(){
  //   const storedWishList = localStorage.getItem('wishList');
  //   if (storedWishList) {
  //     this.wishList = JSON.parse(storedWishList);
  //   }
  //   console.log(this.wishList);
    
  // }

  addToWishlist(product: Product) {
    const storedWishlist = localStorage.getItem('wishList');
    if (storedWishlist) {
      this.wishList = JSON.parse(storedWishlist);
  
      if (!this.isInWishList(product)) {
        this.wishList.push(product);
        localStorage.setItem('wishList', JSON.stringify(this.wishList));
      }
    } else {
      const newWishlist: Product[] = [product];
      localStorage.setItem('wishList', JSON.stringify(newWishlist));
    }
  }
  

  isInWishList(item: Product): boolean {
    const storedWishlist = localStorage.getItem('wishList');
    if (storedWishlist) {
      this.wishList = JSON.parse(storedWishlist);
      return this.wishList.some(wishListItem => wishListItem.product_id === item.product_id);
    }
    return false
  }
}
