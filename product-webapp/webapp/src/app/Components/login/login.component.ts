import { auth } from './../../authModel';
import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
// import { user } from '../cart-page/cart-page.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {
  UserData !: auth

  constructor(private login: LoginService, private router: Router) { }
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    console.warn(this.profileForm.value);
    const user: auth = { name: this.profileForm.value.name, email: this.profileForm.value.email, password: this.profileForm.value.password }
    this.login.doLogin(user).subscribe(
      (token) => {
        console.log(token);
        // Successful login
        if (token) {
          // Check here if the person is user or seller.

          // if it a user the below code will be applicable
          
          this.router.navigate(['/']);
          // localStorage.setItem()
          this.login.isSellerLoggedIn.next(false)
          this.login.isUserLoggedIn.next(true)
        } else {
          // Handle unsuccessful login
          alert('Username and password not found');
        }
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
        // Show appropriate error message or handle differently if needed
      }
    );
  }
}