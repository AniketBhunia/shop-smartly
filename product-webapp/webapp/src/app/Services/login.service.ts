import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { auth } from '../authModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  doLogin(auth:auth){
    return this.http.post<auth>("http://localhost:8084/user/login",auth);
  }
}
