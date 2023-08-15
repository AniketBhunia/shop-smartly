import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient) { }
  userRegister(seller1:any){
    return this.http.post<any>("http://localhost:8087/seller/register",seller1).subscribe();
   }
}
