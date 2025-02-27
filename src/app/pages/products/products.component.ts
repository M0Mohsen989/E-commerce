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
    
  productUsub!: Subscription
  addToUSERCartsub!: Subscription
  aDDtoWishlistsub!: Subscription

  constructor( private _CartService : CartService ,private _ProductService :ProductService ,private _ToastrService :ToastrService ,private _WishlistService :WishlistService){}


  ngOnInit(): void {  
   this.productUsub= this.productUsub = this._ProductService.getAllproducts().subscribe({
        next: (res) => {
            this.productData = res.data;
            console.log(this.productData);
        },
        error: (error) => {
            console.log(error);
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


    
    aDDtoWishList(p_ID:string){
    this.aDDtoWishlistsub=  this._WishlistService.aDDtoWishlist(p_ID).subscribe({
        next:(res)=>{
          console.log(res);
          this._ToastrService.success(res.message)
      
        },error:(err)=>{
          console.log(err);
          
        }
      })
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

