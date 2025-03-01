import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/products/product.service';
import { IProduct } from '../../core/interfaces/products/iproduct';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../core/interfaces/categories/category';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SearchPipe, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  searchValue: string = '';
  productData!: IProduct[];
  wishlistProducts: string[] = []; // لحفظ المنتجات المضافة إلى wishlist
  productUsub!: Subscription;
  addToUSERCartub!: Subscription;
  aDDtoWishlistsub!: Subscription;
  CategoryData!: ICategory[];
  CategoryUsub!: Subscription;




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






  constructor(
    private _ProductService: ProductService,
    private _CategoriesService: CategoriesService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishlistService: WishlistService,
    private _loadingspinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    // تحميل جميع الكاتيجوريز
    this.CategoryUsub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.CategoryData = res.data;
      },
      error: (error) => {
        this._loadingspinner.hide();
        console.log(error);
      }
    });

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


  
  // إضافة المنتج إلى سلة التسوق
  addTOcart(p_ID: string) {
    this.addToUSERCartub = this._CartService.addToUSERCart(p_ID).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message);
        this._CartService.cartCount.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.CategoryUsub) this.CategoryUsub.unsubscribe();
    if (this.aDDtoWishlistsub) this.aDDtoWishlistsub.unsubscribe();
    if (this.addToUSERCartub) this.addToUSERCartub.unsubscribe();
    if (this.productUsub) this.productUsub.unsubscribe();
  }
}
