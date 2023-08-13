import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from '../authModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  doLogin(auth:auth){
    return this.http.post<auth>("http://localhost:8084/user/login",auth);
  }

}
