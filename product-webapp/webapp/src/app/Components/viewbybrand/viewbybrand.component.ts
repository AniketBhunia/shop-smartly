import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-viewbybrand',
  templateUrl: './viewbybrand.component.html',
  styleUrls: ['./viewbybrand.component.css']
})
export class ViewbybrandComponent implements OnInit {
  brandValue: any;
  constructor(private productService:ProductService,private activateRoute: ActivatedRoute){}
  similarBrandProducts !: Product[];

  ngOnInit(): void {
    this.brandValue = this.activateRoute.snapshot.paramMap.get('brand')

    this.brandValue && this.productService.searchByBrand(this.brandValue).subscribe((res:any) => {
      this.similarBrandProducts = res
      console.log(this.similarBrandProducts);
    })

}
}
