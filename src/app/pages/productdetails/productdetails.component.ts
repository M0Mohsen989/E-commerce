import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-productdetails',
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss'
})
export class ProductdetailsComponent implements OnInit  , OnDestroy {

ProductDetailsOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
      navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: false
  }



  ProductdetailsFirstSub!:Subscription
  getSpecificProductSub!:Subscription
  addToUSERCartSub!:Subscription

Productdetails :IProduct|null =null
product_ID!:string

constructor( private _ProductService :ProductService,private _CartService:CartService,private _ToastrService :ToastrService) {}
private readonly _ActivatedRoute =inject(ActivatedRoute)

ngOnInit(): void {
   this.ProductdetailsFirstSub =this._ActivatedRoute.paramMap.subscribe({
    next : (res)=>{
      this.product_ID =res.get('p_ID')     !
    } 
  })


 this.getSpecificProductSub =this._ProductService.getSpecificProduct(this.product_ID).subscribe({

  next: (res)=> {
    this.Productdetails =res.data
    console.log(this.Productdetails);
    
  },
  error: (err)=> {
    console.log(err);
  }})
}

addTOcart(){
 this.addToUSERCartSub= this._CartService.addToUSERCart(this.product_ID).subscribe({
    next:(res)=>{
      console.log(res);
      this._ToastrService.success(res.message)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

ngOnDestroy(): void {

  if(this.ProductdetailsFirstSub){this.ProductdetailsFirstSub.unsubscribe()}
  if(this.addToUSERCartSub){this.addToUSERCartSub.unsubscribe()}
  if(this.getSpecificProductSub){this.getSpecificProductSub.unsubscribe()}




  
  
  
}
}
