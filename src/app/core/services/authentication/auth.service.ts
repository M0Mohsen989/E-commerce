import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';
import { jwtDecode } from 'jwt-decode';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }
userInoTO!:any 
    // usertokenDecode(token:string):any{}
    decodeToken(){
      if(sessionStorage.getItem('token')){
       this.userInoTO = jwtDecode(sessionStorage.getItem('token') !)
   }
    }

 

  signUp(data:object):Observable<any>{
    return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/auth/signup`,data)

  }

  signIn(data:object):Observable<any>{
    return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/auth/signin`,data)
  }


    forgetUserPassword(data:object):Observable<any>{
      return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/auth/forgotPasswords` , data)
    }


    verfiyCode(data:object):Observable<any>{
      return this._HttpClient.post(`${enviro.BaseUrl}/api/v1/auth/verifyResetCode`, data)
    }

    resetuserPassword(data:object):Observable<any>{

      return this._HttpClient.put(`${enviro.BaseUrl}/api/v1/auth/resetPassword` , data)
    }




}
