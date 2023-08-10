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
  ngOnInit(): void {
    this.categoryValue = this.activateRoute.snapshot.paramMap.get('category')

    this.categoryValue && this.productService.searchByCategory(this.categoryValue).subscribe((res) => {
      this.similarProducts = res
      console.log(this.similarProducts);
    })
  }

}
