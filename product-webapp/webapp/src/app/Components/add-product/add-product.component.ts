import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from 'src/app/data.types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  uploadedImageFile !: File ;

  constructor(private productService:ProductService) { }
  ngOnInit(): void {
    
  }

  // Function to handle the image upload
  handleImageUpload(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.uploadedImageFile = files[0]; // Store the uploaded image file
    }
  }

  // Implement your submit function to handle the form submission
  submit(formData: any) {
    console.log(this.uploadedImageFile);
    console.log(localStorage.getItem('userId'));
    // seller_id: number = +localStorage.getItem('userId');
    const demo  =  {
      product_id : Math.floor(Math.random() * 500),
      product_name:formData.product_name,
      product_quantity:formData.product_quantity,
      product_status:formData.product_status,
      product_description:formData.product_description,
      productBrand:formData.productBrand,
      product_category:formData.product_category,
      product_current_price:formData.product_current_price,
      product_discount_price:formData.product_discount_price,
      product_age:formData.product_age,
      seller_id: 308
    }
    console.log(JSON.stringify(demo));
    this.productService.addProduct(JSON.stringify(demo), this.uploadedImageFile).subscribe(
      (res) => {
        if (res) {
          // Handle a successful response here, and display a success SweetAlert
          Swal.fire({
            title: 'Success!',
            text: 'Product added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        // Handle an error response here, and display an error SweetAlert
        console.error('Error:', error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the product.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
    
  }
}