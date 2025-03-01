import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { ProductService } from '../../core/services/products/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [SearchPipe, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy {

  searchValue:string =''
  productData!:IProduct[]
  wishlistProducts: string[] = []; // لحفظ المنتجات المضافة إلى wishlist

  productUsub!: Subscription
  addToUSERCartsub!: Subscription
  aDDtoWishlistsub!: Subscription

  constructor( private _CartService : CartService ,private _ProductService :ProductService ,private _ToastrService :ToastrService ,private _WishlistService :WishlistService){}


  ngOnInit(): void {  
   // تحميل جميع المنتجات
   this.productUsub = this._ProductService.getAllproducts().subscribe({
    next: (res) => {
      this.productData = res.data.map((product: any) => ({
        ...product,
        select: false // إضافة الخاصية بشكل افتراضي
      }));
      this.loadWishlist();// تحميل قائمة الـ wishlist بعد جلب المنتجات
    },
    error: (error) => {
      console.log(error);
    }
  });
  }
  

    
  // تحميل المنتجات الموجودة في الـ wishlist
  loadWishlist() {
    this._WishlistService.GetAllUserWishList().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data.map((item: any) => item._id);
        this.productData.forEach((product) => {
          product.select = this.wishlistProducts.includes(product._id);
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  


    addTOcart(p_ID:string){
    this.addToUSERCartsub=  this._CartService.addToUSERCart(p_ID).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message);

          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }


  
  // إضافة وإزالة المنتجات من الـ wishlist
  aDDtoWishList(p_ID: string, product: any) {
    this._WishlistService.aDDtoWishlist(p_ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);

        // تحديث حالة المنتج وإضافته/إزالته من القائمة
        if (!product.select) {
          this.wishlistProducts.push(p_ID);
        } else {
          this.wishlistProducts = this.wishlistProducts.filter(id => id !== p_ID);
        }
        product.select = !product.select; // تحديث اللون في الواجهة
      },
      error: (err) => {
        console.log(err);
      }
    });
  }










          ngOnDestroy(): void {
            if (this.productUsub) {
              this.productUsub.unsubscribe();
            }
            if (this.aDDtoWishlistsub) {
              this.aDDtoWishlistsub.unsubscribe();
            }
            if (this.addToUSERCartsub) {
              this.addToUSERCartsub.unsubscribe();
            }

          }
          

}

