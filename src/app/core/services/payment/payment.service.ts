import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  userToken:any
  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID:any ) {
 
           if(isPlatformBrowser(this._PLATFORM_ID)){
             this.userToken= {token :sessionStorage.getItem('token')}
 
           }else{
             this.userToken ={}
           }
    }
 



    onlinePayment(c_ID:string,data:object):Observable<any>{
      
      return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/orders/checkout-session/${c_ID}?url=${enviro.localHost}`,{"shippingAddress":data}, {headers:this.userToken})
    }

    getUserOrders(user_ID :string):Observable<any>{
      return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/orders/user/${user_ID}`)
    }

}
