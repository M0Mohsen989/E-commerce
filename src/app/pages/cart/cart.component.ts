import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../core/interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit ,OnDestroy {
  


cartData!:ICart
  private readonly _CartService = inject(CartService)
  private readonly _ToastrService = inject(ToastrService)
  private readonly _Router = inject(Router)

  getLoggedUserCartSub!:Subscription
  deleteSpecificItemSub!:Subscription
  updateCartProductQuantitySub!:Subscription
  clearAllCartSub!:Subscription

    ngOnInit(): void {
      this.getLoggedUserCartSub= this._CartService.getLoggedUserCart().subscribe({

        next :(res)=> {
          console.log(res.data);
          this.cartData = res.data
          
        },
        error :(err)=>{
          console.log(err);
          
        }


      })
    }

    deleteSpecificItem(p_ID:string){
      this.deleteSpecificItemSub=  this._CartService.deleteSpecificCartItem(p_ID).subscribe({
        next:(res)=>{
          console.log(res.data);
          this.cartData=res.data
          this._CartService.cartCount.next(res.numOfCartItems)
          this._ToastrService.success('Item Removed Success')
        },
        error:(err)=> {
         console.log(err);
          
        }
      })
    }

    updateCartProductQun(p_ID:string , count:number){
      this.updateCartProductQuantitySub = this._CartService.updateCartProductQuantity(p_ID,count).subscribe({

        next:(res)=>{
          console.log(res);
          this.cartData = res.data
          this._ToastrService.success('Item Quntity Updated Success')

          
        },
        error:(err)=>{
          console.log(err);
          
        }
        
      })
    }

    clearAllCart(){
      this.clearAllCartSub = this._CartService.clearAllCart().subscribe({

          next:(res)=>{
            console.log(res.data);
            this.cartData=res.data
            this._Router.navigate(['/home'])

          }

      })
    }


    ngOnDestroy(): void {
      if (this.clearAllCartSub) {this.clearAllCartSub.unsubscribe()}
      if (this.deleteSpecificItemSub) {this.deleteSpecificItemSub.unsubscribe()}
      if (this.getLoggedUserCartSub) {this.getLoggedUserCartSub.unsubscribe()}
      if (this.updateCartProductQuantitySub) {this.updateCartProductQuantitySub.unsubscribe()}
      
      
      

    }
}
