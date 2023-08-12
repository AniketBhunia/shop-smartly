import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  allCategories: string[] = []
  contentArray!: Product[]
  searchSuggestion: undefined | Product[]
  constructor(private productService: ProductService, private route: Router) { }

  ngOnInit(): void {
    this.productService.productList().subscribe((res) => {
      this.contentArray = res.content
      console.log(this.contentArray);

      this.allCategories = Array.from(new Set(this.contentArray.map((item: any) => item.product_category)))
      console.log((this.allCategories));

    })

  }

  searchProduct(name: any) {
    if (name) {
      const element = name.target as HTMLInputElement
      this.productService.searchByName(element.value).subscribe((res) => {
        if (res.length > 5) {
          res.length = length
        }
        this.searchSuggestion = res
      })

    }
  }
  hideSearch() {
    this.searchSuggestion = undefined
  }
  submitSearch(data: any) {
    console.log(data)
    // this.route.navigate([`details/${data}`])
  }
  redirectToDetails(id: any) {
    this.route.navigate(['details/' + id])
  }


}
