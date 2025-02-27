import { Category } from './../../core/interfaces/products/iproduct';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/category';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import {FormsModule} from'@angular/forms'
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { log } from 'console';
import { ToastrIconClasses, ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe , FormsModule ,RouterLink], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  , OnDestroy{

searchValue:string =''

  MainStaticSliderOptions: OwlOptions = {
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

  


  customOptions: OwlOptions = {
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
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }



  productData!:IProduct[]
  
  productUsub!: Subscription
  addToUSERCartub!: Subscription
  aDDtoWishlistsub!: Subscription

  CategoryData!:ICategory[]
  CategoryUsub!: Subscription
category: any;
slide: any;

  constructor(private  _ProductService : ProductService , private _CategoriesService :CategoriesService,private _CartService :CartService ,private _ToastrService :ToastrService,private _WishlistService :WishlistService, private _loadingspinner: NgxSpinnerService)  { }



  ngOnInit(): void {
        //show the loading screen
      this.CategoryUsub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        //hide the loading screen
        this.CategoryData=res.data
        console.log(this.CategoryData);
      },
      error: (error) => {
        this._loadingspinner.hide()
          console.log(error);
      }
      });

  this.productUsub=  this._ProductService.getAllproducts().subscribe({
      next: (res) => {
       this.productData=res.data
        console.log(this.productData);
      },
      error: (error) => {
          console.log(error);
      }
    });
  }


    addTOcart(p_ID:string){
    this.addToUSERCartub=  this._CartService.addToUSERCart(p_ID).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message);
          this._CartService.cartCount.next(res.numOfCartItems)

          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }



    aDDtoWishList(p_ID:string){
     this.aDDtoWishlistsub= this._WishlistService.aDDtoWishlist(p_ID).subscribe({
  next:(res)=>{
    console.log(res);
    this._ToastrService.success(res.message)

  }
})
 }

 favoriteProducts: { [key: string]: boolean } = {}; // تخزين حالة كل منتج

  toggleFavorite(productId: string) {
    // إذا لم يكن المنتج موجودًا في القائمة، نضيفه بحالة افتراضية `false`
    if (!(productId in this.favoriteProducts)) {
      this.favoriteProducts[productId] = false;
    }

    // عكس قيمة المفضلة للمنتج
    this.favoriteProducts[productId] = !this.favoriteProducts[productId];

    // إجبار Angular على التعرف على التغيير
    this.favoriteProducts = { ...this.favoriteProducts };
    console.log(this.favoriteProducts); // تحقق من القيم في الـ Console
  }
 

 
    ngOnDestroy(): void {
      if (this.CategoryUsub) this.CategoryUsub.unsubscribe();
      if (this.aDDtoWishlistsub) this.aDDtoWishlistsub.unsubscribe();
      if (this.addToUSERCartub) this.addToUSERCartub.unsubscribe();
      if (this.productUsub) this.productUsub.unsubscribe();
    }
    
}
