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
export class WishlistComponent implements OnInit, OnDestroy {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _CartService = inject(CartService);

  wishListData!: IWsihlist;
  cartCount!: number;  // عدد العناصر في السلة
  GetAllUserWishListSUB!: Subscription;
  reMOveProducttSUB!: Subscription;
  addToUSERCartSUB!: Subscription;
  refreshWishlistsub!: Subscription;

  ngOnInit(): void {
    this.GetAllUserWishListSUB = this._WishlistService.GetAllUserWishList().subscribe({
      next: (res) => {
        this.wishListData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // الاشتراك في cartCount لمتابعة التغييرات في عدد العناصر في السلة
    this._CartService.cartCount.subscribe(count => {
      this.cartCount = count;
    });
  }

  removeProduct(p_ID: string) {
    this.reMOveProducttSUB = this._WishlistService.reMOveProduct(p_ID).subscribe({
      next: (res) => {
        this._ToastrService.success('Product removed successfully');
        this.refreshWishlist();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addTOCart(p_ID: string) {
    this.addToUSERCartSUB = this._CartService.addToUSERCart(p_ID).subscribe({
      next: (res) => {
        this._CartService.cartCount.next(res.numOfCartItems)
        this._ToastrService.success(res.message);
        this.removeProduct(p_ID);  // حذف المنتج من الـ wishlist بعد إضافته للعربة
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  refreshWishlist() {
    this.refreshWishlistsub = this._WishlistService.GetAllUserWishList().subscribe({
      next: (res) => {
        this.wishListData = res;
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
