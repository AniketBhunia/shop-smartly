import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/Services/seller.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sign-up-seller',
  templateUrl: './sign-up-seller.component.html',
  styleUrls: ['./sign-up-seller.component.css']
})
export class SignUpSellerComponent {
  singInForm = new FormGroup({
    sellerName:new FormControl('',[Validators.required]),
    sellerEmail: new FormControl('',[Validators.required,Validators.email]),
    sellerPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
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
  if(!this.singInForm.valid){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Invalid email or password',

    })
   }else{
    if(seller.sellerEmail==''||seller.sellerAge==''||seller.sellerName==''||seller.sellerPassword==''||seller.sellerPassword==''||seller.sellerPhoneNo==''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fill all required field',

      })
    }else{
      this.sellerService.userRegister(seller).subscribe(
        (res)=>{
          console.log(res);
          this.router.navigate(['/login'])
        },
        (err)=>{

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,

          })
        }
      );
    }
   }


}


  get registerFormControl() {
    return this.singInForm.controls;
  }
}
