
import { Component } from '@angular/core';
import { FormControl, Validators ,FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

constructor(private login:LoginService,private route:Router){}
  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  profileForm = new FormGroup({
    ename:new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
  });

  // public myError = (controlName: string, errorName: string) =>{
  //   return this.profileForm.controls[controlName].hasError(errorName);
  //   }

  get registerFormControl() {
    return this.profileForm.controls;
  }

  onSubmit(){
    console.warn(this.profileForm.value);
    const user:any={name:this.profileForm.value.ename,email:this.profileForm.value.email,password:this.profileForm.value.password}
    if(!this.profileForm.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password',

      })
    }else{
      this.login.doLogin(user).subscribe((res:any)=>{
        console.log(res);
        const token = res['token'];
        const userId=res['id'];
        const name=res['name'];
        const email=res['email'];
        const role=res['role'];
        this.login.setBearerToken(token);
        this.login.setUserId(userId);
        this.login.setEmail(email);
        this.login.setName(name);
        this.login.setRole(role);

        if (role === 'user') {
          this.route.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
          }, 100); // You can adjust the delay as needed
        } else if (role === 'seller') {
          this.route.navigate(['/products']);
           // Change the route to your seller dashboard
           setTimeout(() => {
            window.location.reload();
          }, 100);
        }
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
