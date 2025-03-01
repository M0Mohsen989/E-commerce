import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { IAllorders } from '../../core/interfaces/allorders/iallorders';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe ,DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
  constructor(private _PaymentService:PaymentService,private _AuthService :AuthService) { }

user_ID!:string
allOrdersData!:IAllorders[]

    

ngOnInit(): void {
  this._AuthService.decodeToken()
  this.user_ID = this._AuthService.userId
  console.log( 'user id', this.user_ID);


  
     this._PaymentService.getUserOrders(this.user_ID).subscribe({
       next:(res)=>{
         console.log( 'here',res);
         this.allOrdersData=res
       }
     })
   

}


}
