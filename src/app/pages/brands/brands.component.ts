import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/brands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy {

  constructor(private _BrandService:BrandService){}
  brandsData!:IBrands[]

  brandsUNSUb! : Subscription

  ngOnInit(): void {
    this.brandsUNSUb= this._BrandService.getALLbrands().subscribe({

      next:(res)=>{
        console.log(res);
        this.brandsData= res.data
        
      },error:(err)=>{
        console.log(err);
        
      }

    })
  }



  ngOnDestroy(): void {

    if (this.brandsUNSUb) {
      this.brandsUNSUb.unsubscribe() 
    }
    
  }
  



}
