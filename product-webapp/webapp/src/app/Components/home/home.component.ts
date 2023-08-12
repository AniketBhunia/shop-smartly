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
  
  constructor(private productService : ProductService,private route:Router){}
  
  
  ngOnInit(): void {
    this.productService.popularProductsForHome().subscribe((res)=>{
      this.popularProducts = res;
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
    return this.popularProducts.slice(this.endIndex);
  }
  get itemsToShow1(): any[] {
    return this.popularProducts.slice(this.startIndex, this.endIndex + 1);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  search : String ="";
  // ngOnInit(): void {
  //   // Add any initialization logic here if needed.
  // }

}

