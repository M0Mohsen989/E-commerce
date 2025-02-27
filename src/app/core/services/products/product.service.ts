import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _HttpClient =inject(HttpClient)
  constructor() { }


  getAllproducts():Observable<any>{
    return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/products`)
  }


  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/products/${id}`)
  }

}



