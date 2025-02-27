import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviro } from '../../../shared/environement/environement';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

    private readonly _HttpClient=inject(HttpClient)

  constructor() { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${enviro.BaseUrl}/api/v1/categories`)
  }

}

