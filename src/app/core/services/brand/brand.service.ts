import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient:HttpClient) { }




  getALLbrands():Observable<any>{

    return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/brands`)
  }


}
