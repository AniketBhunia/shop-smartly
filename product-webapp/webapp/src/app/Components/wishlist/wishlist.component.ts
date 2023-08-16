import { Component } from '@angular/core';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishList: Product[] = [];

  constructor() {}

  ngOnInit() {
    this.loadWishlistFromLocalStorage();
  }
  loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishList');
    if (storedWishlist) {
      this.wishList = JSON.parse(storedWishlist);
    }
  }

  removeFromWishlist(index: number) {
    this.wishList.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('wishList', JSON.stringify(this.wishList)); // Update localStorage
  }
}
