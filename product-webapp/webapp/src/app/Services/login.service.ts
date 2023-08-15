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

  setBearerToken(token:any) {
    localStorage.setItem('token', token);
  }

  getBearerToken() {
    return localStorage.getItem('token');
  }

  deleteBearerToken(){
    localStorage.removeItem('token');
  }

  setName(name:any){
    localStorage.setItem("name",name);
  }
  getName(){
    localStorage.getItem("name");
  }
  setEmail(email:any){
    localStorage.setItem("email",email);
  }
  getEmail(){
    localStorage.getItem("email");
  }
  setRole(role:any){
    localStorage.setItem("role",role);
  }
  getRole(){
    localStorage.getItem("role");
  }
  setUserId(userId:any){
    localStorage.setItem("userId",userId);
  }
  getUserId(){
    localStorage.getItem("userId");
  }
}
