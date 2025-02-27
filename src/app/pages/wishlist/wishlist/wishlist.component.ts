import { CurrencyPipe } from '@angular/common';
import { IWsihlist } from '../../../core/interfaces/wishlist/iwsihlist';
import { WishlistService } from './../../../core/services/wishlist/wishlist.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit ,OnDestroy {

private readonly _WishlistService  = inject(WishlistService)
private readonly _ToastrService  = inject(ToastrService)
private readonly _CartService  = inject(CartService)


  wishListData!:IWsihlist 

  GetAllUserWishListSUB!:Subscription 
  reMOveProducttSUB!:Subscription 
  addToUSERCartSUB!:Subscription 
  refreshWishlistsub!:Subscription 

ngOnInit(): void {

  this.GetAllUserWishListSUB= this._WishlistService.GetAllUserWishList().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.wishListData= res
      
    },error:(err)=>{
      console.log(err);
      
    }

  })
  
}



removeProduct(p_ID:string) {
  this.reMOveProducttSUB= this._WishlistService.reMOveProduct(p_ID).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success('Product removed successfully');
      
      // تحديث البيانات بعد الحذف
      this.refreshWishlist();
    },
    error: (err) => {
      console.log(err);
    }
  });
}

addTOCart(p_ID:string) {
  this.addToUSERCartSUB= this._CartService.addToUSERCart(p_ID).subscribe({
    next: (res) => {
      console.log(res);
      this._ToastrService.success(res.message);

      // حذف المنتج من الـ wishlist بعد إضافته للعربة
      this.removeProduct(p_ID);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

// تحديث البيانات
refreshWishlist() {
 this.refreshWishlistsub= this._WishlistService.GetAllUserWishList().subscribe({
    next: (res) => {
      this.wishListData = res;  // تحديث البيانات بعد أي تغيير
    },
    error: (err) => {
      console.log(err);
    }
  });
}

  
 


ngOnDestroy(): void {
 if (this.GetAllUserWishListSUB) this.GetAllUserWishListSUB.unsubscribe();
 if (this.reMOveProducttSUB) this.reMOveProducttSUB.unsubscribe();  
  if (this.addToUSERCartSUB) this.addToUSERCartSUB.unsubscribe();
  if (this.refreshWishlistsub) this.refreshWishlistsub.unsubscribe();
}


}
