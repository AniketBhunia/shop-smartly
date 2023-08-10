import { auth } from './../../authModel';
import { Component } from '@angular/core';
import { FormControl, Validators ,FormGroup} from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

constructor(private login:LoginService){}
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  profileForm = new FormGroup({
    name:new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit(){
    console.warn(this.profileForm.value);
    const user:auth={name:this.profileForm.value.name,email:this.profileForm.value.email,password:this.profileForm.value.password}
    this.login.doLogin(user).subscribe((token)=>{ console.log(token)}

    );
  }
}
