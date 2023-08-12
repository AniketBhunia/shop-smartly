import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css']
})
export class SignUpUserComponent {
  constructor(private userService:UserService){}
  singInForm = new FormGroup({
    userName:new FormControl(''),
    userEmail: new FormControl(''),
    userPassword: new FormControl(''),
    userGender:new FormControl(''),
    userPhoneNo:new FormControl(''),
    userAge:new FormControl(''),
    addressList:new FormControl(''),

  });

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
    this.userService.userRegister(user1).subscribe(
      (res)=>{
        console.log(res);
      }
    );

  }

}

