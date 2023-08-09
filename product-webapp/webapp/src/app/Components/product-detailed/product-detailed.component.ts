import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.css']
})
export class ProductDetailedComponent implements OnInit {
  productData !: Product;
  constructor(private productService:ProductService,private activate: ActivatedRoute,){}

  ngOnInit(): void {
    let productId= this.activate.snapshot.paramMap.get('productId');
    console.log(productId);

    productId && this.productService.getProductByID(productId).subscribe((res)=>{
      this.productData = res
      console.log(this.productData);
      
    })
    
  }

}
