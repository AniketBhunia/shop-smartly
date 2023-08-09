import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';

@Component({
  selector: 'app-product-lists',
  templateUrl: './product-lists.component.html',
  styleUrls: ['./product-lists.component.css']
})
export class ProductListsComponent implements OnInit {
  contentArray!: Product[]
  popularProductList !: Product[]
  products!: Product[];
  products2: any[] = []
  p: number = 1;
  itemsPerPage: number = 4;
  totalProduct: any
  
  // image:any | undefined
  // product_id = 81;
  // selectedImage!:File;

  constructor(private product_service: ProductService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.getProductById(81)
    this.fetchProducts()
    this.getPopularProducts()
    this.searchByName("mobil")
  }


  fetchProducts() {
    this.product_service.productList().subscribe((res: any) => {
      this.contentArray = res.content;
      console.log(this.contentArray);
      this.contentArray.forEach((product: any) => {
        this.products2.push({
          ...product,
          image: 'data:image/jpeg;base64,' + product.product_image
        });
      });
      (error: any) => {
        console.error('Error fetching products:', error);
      }
      this.totalProduct = this.contentArray.length
      console.log(this.totalProduct);

  })
}
getProductById(product_id: string){
  return this.product_service.getProductByID(product_id).subscribe((res) => {
    console.log(res)
  })
}

getPopularProducts() {
  return this.product_service.popularProducts().subscribe(
    (res: any[]) => {
      this.products = []; // Initialize the array

      res.forEach((product: any) => {
        this.products.push({
          ...product,
          image: 'data:image/jpeg;base64,' + product.product_image
        });
      });
    },
    (error: any) => {
      console.error('Error fetching popular products:', error);
    }
  );
}



//   this.products = res.map(product => ({
  //     ...product,
  //     image : this.convertByteArrayToBase64(product.product_image)
  //   }));
  //   console.log(this.products);
    
  // },
  // error => {
  //   console.error('Error fetching products:', error);
  // }

searchByName(name:string){
  return this.product_service.searchByName(name).subscribe((res)=>{
    console.log(res)
  })
}

// convertByteArrayToBlob(byteArray: number[]):any{
//   const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpg' });
//   const imageUrl = URL.createObjectURL(blob);
//   const image = this.sanitizer.bypassSecurityTrustUrl(imageUrl)
//   return image
// }

  // onSaveProduct(productData: any, productForm: any) {
  //   // Convert productData to JSON string
  //   const productDataString = JSON.stringify(productData);

  //   // Call the service method to save product with image
  //   this.product_service.saveProductWithImage(productDataString, this.selectedImage)
  //     .subscribe(
  //       response => {
  //         console.log('Product saved successfully:', response);
  //       },
  //       error => {
  //         console.error('Error saving product:', error);
  //       }
  //     );

  //   // Reset the form
  //   productForm.reset();
  // }

  // onImageChange(event: any) {
  //   this.selectedImage = event.target.files[0];
  // }
  convertByteArrayToBase64(byteArray: number[]): string {
    const uint8Array = new Uint8Array(byteArray);
    const base64String = btoa(String.fromCharCode(...uint8Array));
    return base64String;
  }
}
