import { Component, inject, OnInit, OnDestroy, signal, input, InputSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit ,OnDestroy {
  private readonly _router = inject(Router)
  private readonly _AuthService = inject(AuthService)
  private readonly _CartService = inject(CartService)


    navCountSub!:Subscription

      navCartCount!:number


      checkNav:InputSignal<boolean> = input (false)

    ngOnInit(): void {

        this._CartService.getLoggedUserCart().subscribe({

          next:(res)=>{
           this.navCartCount= res.numOfCartItems

          }
        })

        this.navCountSub =this._CartService.cartCount.subscribe({
      next:(value)=>{

        this.navCartCount=value
      }
     })
      


    }



  logOut(){

    sessionStorage.removeItem('token')
    this._router.navigate(['/login'])
    this._AuthService.userInoTO=null  

    
  }

  ngOnDestroy(): void {
    if (this.navCountSub) {
      this.navCountSub.unsubscribe()
    }
    
  }

}
