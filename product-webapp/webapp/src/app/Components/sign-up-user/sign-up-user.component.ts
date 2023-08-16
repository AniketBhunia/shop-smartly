import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css']
})
export class SignUpUserComponent {
  constructor(private userService:UserService,private router: Router){}
  singInForm = new FormGroup({
    userName:new FormControl('',[Validators.required]),
    userEmail: new FormControl('',[Validators.required]),
    userPassword: new FormControl('',[Validators.required]),
    userGender:new FormControl('',[Validators.required]),
    userPhoneNo:new FormControl('',[Validators.required]),
    userAge:new FormControl('',[Validators.required]),
    addressList:new FormControl('',[Validators.required]),

  });
  get registerFormControl() {
    return this.singInForm.controls;
  }
  onSubmit(){
    console.warn(this.singInForm.value);
    const value=this.singInForm.value;
    const user1={
      userName:value.userName,
      userEmail:value.userEmail,
      userPassword:value.userPassword,
      userGender:value.userGender,
      userPhoneNo:value.userPhoneNo,
      userAge:value.userAge,
      addressList:value.addressList
    }
    console.log(user1.userGender)
    this.router.navigate(['/login'])
    this.userService.userRegister(user1).subscribe(
      (res)=>{
        console.log(res);
      }
    );

  }

}

