import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
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
  // isSellerLoggedIn !: boolean
  isLoggedIn = false;
  constructor(private productService: ProductService, private route: Router, private login: LoginService) { const authToken = localStorage.getItem('token');
  if (authToken) {
    this.isLoggedIn = true; // Set to true if the token is present
  } else {
    this.isLoggedIn = false; // Set to false if the token is not present
  }}

  ngOnInit(): void {
    this.productService.productList().subscribe((res) => {
      this.contentArray = res.content
      console.log(this.contentArray);

      this.allCategories = Array.from(new Set(this.contentArray.map((item: any) => item.product_category)))
      console.log((this.allCategories));

    })

  }
  logout() {
    // Remove the token from localStorage upon logout
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('sellerId');
    this.isLoggedIn = false;
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
    const delayMilliseconds = 100;
    this.route.navigate(['/details', id])
    setTimeout(() => {
      // Reload the window after the specified delay
      window.location.reload()
    }, delayMilliseconds);
  }
  redirectoCateories(category: string): void {
    const delayMilliseconds = 100;
    // event.preventDefault(); // Prevent the default link behavior
    this.route.navigate(['/view_products', category]);
    setTimeout(() => {
      // Reload the window after the specified delay
      window.location.reload()
    }, delayMilliseconds);
  }


}
