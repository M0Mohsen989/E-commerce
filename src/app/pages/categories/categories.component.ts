import { Category } from './../../core/interfaces/cart/icart';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy{

    constructor(private _CategoriesService:CategoriesService){}

    CategoryData!:ICategory[]
    CategoryDataSUB!:Subscription

    ngOnInit(): void {
     this.CategoryDataSUB = this._CategoriesService.getAllCategories().subscribe({

          next:(res)=>{
            console.log(res);
            this.CategoryData= res.data
            
          },error:(err)=>{

            console.log(err);
            
          }

      })
    }


    ngOnDestroy(): void {
      if (this.CategoryDataSUB) {this.CategoryDataSUB.unsubscribe() }
}
}
