import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerService } from 'src/app/Services/seller.service';

@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrls: ['./sign-up-seller.component.css']
})
export class SignUpSellerComponent {
  singInForm = new FormGroup({
    sellerName:new FormControl(''),
    sellerEmail: new FormControl(''),
    sellerPassword: new FormControl(''),
    sellerGender:new FormControl(''),
    sellerPhoneNo:new FormControl(''),
    sellerAge:new FormControl(''),

  });
  constructor(private sellerService:SellerService){}

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
    this.sellerService.userRegister(seller).subscribe((res)=>{
      console.log(res)
    });
  }

}
