import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  userToken! : any

  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID:any ) {

          if(isPlatformBrowser(this._PLATFORM_ID)){
            this.userToken= {token :sessionStorage.getItem('token')}

          }else{
            this.userToken ={}
          }
   }


   cartCount:BehaviorSubject<number> =new BehaviorSubject(0)

    getLoggedUserCart():Observable<any>{
      return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/cart`,{headers: this.userToken});


    }

    addToUSERCart(p_ID: string):Observable<any>{
      return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/cart`,{"productId": p_ID},{headers: this.userToken})
    }


    deleteSpecificCartItem(p_ID:string):Observable<any>{
      return this._HttpClient.delete(`${enviro.BaseUrl}/api/v1/cart/${p_ID}`, {headers: this.userToken})
      
    } 

    updateCartProductQuantity(p_ID:string ,count:number):Observable<any>{
      return this._HttpClient.put(`${enviro.BaseUrl}/api/v1/cart/${p_ID}`,{"count":count},{headers: this.userToken} )
    }

    clearAllCart():Observable<any>{
      return this._HttpClient.delete(`${enviro.BaseUrl}/api/v1/cart`, {headers: this.userToken})
    }
}
