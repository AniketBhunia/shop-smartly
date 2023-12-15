import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})

export class HomeComponent implements OnInit{
  popularProducts !: Product[] 
  startIndex: number = 0; // Change this to the desired starting index
  endIndex: number = 3;
  newProducts !: Product [];
  
  constructor(private productService : ProductService,private route:Router){}
  
  
  ngOnInit(): void {
    this.productService.popularProductsForHome().subscribe((res)=>{
      this.popularProducts = res;
    })
    this.productService.getNewArrivals().subscribe((res)=>{
      this.newProducts = res
    })
  }
  details(id:any){
    this.route.navigate([`/details/${id}`])
  }
  getDetailsByBrand(brand:string){
    // this.productService.searchByBrand(brand).subscribe
    this.route.navigate([`view_productsbybrand/${brand}`])
  }

  get itemsToShow(): any[] {
    if (this.popularProducts?.length && this.endIndex < this.popularProducts.length) {
      return this.popularProducts.slice(this.endIndex);
    } else {
      return [];
    }
  }
  
  get itemsToShow1(): any[] {
    if (this.popularProducts?.length && this.startIndex >= 0 && this.endIndex < this.popularProducts.length) {
      return this.popularProducts.slice(this.startIndex, this.endIndex + 1);
    } else {
      return [];
    }
  }
  

  get newItemsToShow(): any[] {
    if (this.newProducts?.length && this.endIndex < this.newProducts.length) {
      return this.newProducts.slice(this.endIndex);
    } else {
      return [];
    }
  }
  
  get newItemsToShow2(): any[] {
    if (this.newProducts?.length && this.startIndex >= 0 && this.endIndex < this.newProducts.length) {
      return this.newProducts.slice(this.startIndex, this.endIndex+1);
    } else {
      return [];
    }
  }
  


  // eslint-disable-next-line @typescript-eslint/ban-types
  // search : String ="";
  // ngOnInit(): void {
  //   // Add any initialization logic here if needed.
  // }

}

