import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit{
  products !:Product[]
  id !: any;
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.id = localStorage.getItem('userId') 
    this.productService.getProductBySellerId(this.id).subscribe((res)=>{
      if(res){
        console.log("response", res);
        // this.products=res as Product[];
        this.products = res
      }
    })
  }
  deleteItem(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteProduct service method
        this.productService.deleteProduct(id).subscribe((res) => {
          // Display a success message using SweetAlert
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          ).then(() => {
            // Reload the window
            window.location.reload();
          });
        });
      }
    });
  }
  

}
