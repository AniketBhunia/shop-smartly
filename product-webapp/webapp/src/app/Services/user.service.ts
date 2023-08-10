import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private http:HttpClient) { }
  userRegister(user1:any){
   return this.http.post<any>("http://localhost:8089/user/register",user1);
  }


}
