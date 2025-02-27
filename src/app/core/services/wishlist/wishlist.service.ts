import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  userToken:any
  constructor(private _HttpClient:HttpClient , @Inject(PLATFORM_ID) private _PLATFORM_ID:any) {

      if(isPlatformBrowser(this._PLATFORM_ID)){
                  this.userToken= {token :sessionStorage.getItem('token')}
      
                }else{
                  this.userToken ={}
                }



   }


    
  
  GetAllUserWishList():Observable<any>{

    return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/wishlist`, {headers:this.userToken})

    }


    aDDtoWishlist(p_ID:string):Observable<any>{

      return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/wishlist`,{"productId": p_ID},{headers: this.userToken})
    }



    reMOveProduct(p_ID:string):Observable<any>{
      return this._HttpClient.delete(`${enviro.BaseUrl}/api/v1/wishlist/${p_ID}`,{headers: this.userToken})
    }



}
