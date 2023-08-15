import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/Services/seller.service';


@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrls: ['./sign-up-seller.component.css']
})
export class SignUpSellerComponent {
  singInForm = new FormGroup({
    sellerName:new FormControl('',[Validators.required]),
    sellerEmail: new FormControl('',[Validators.required]),
    sellerPassword: new FormControl('',[Validators.required]),
    sellerGender:new FormControl('',[Validators.required]),
    sellerPhoneNo:new FormControl('',[Validators.required]),
    sellerAge:new FormControl('',[Validators.required]),

  });
  constructor(private sellerService:SellerService,private router: Router){}

  onSubmit(){
    console.warn(this.singInForm.value);
    const val=this.singInForm.value;
    const seller={
    sellerName:val.sellerName,
    sellerEmail:val.sellerEmail,
    sellerPassword:val.sellerPassword,
    sellerGender:val.sellerGender,
    sellerPhoneNo:val.sellerPassword,
    sellerAge:val.sellerAge
    }
    if(this.singInForm.valid){
      this.router.navigate(['/login'])
    }else{
      // swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: 'Something went wrong!',
      //   footer: '<a href="">Why do I have this issue?</a>'
      // })
    }

    this.sellerService.userRegister(seller);
  }

  get registerFormControl() {
    return this.singInForm.controls;
  }
}
