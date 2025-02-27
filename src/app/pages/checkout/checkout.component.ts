import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../core/services/payment/payment.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{

  private readonly _ActivatedRoute =inject(ActivatedRoute)
  private readonly _PaymentService =inject(PaymentService)

  CartID!:string

  detailsForm:FormGroup = new FormGroup({

    details:new FormControl(null ,[Validators.required ,Validators.minLength(10) , Validators.maxLength(40)] ),
    phone :new FormControl(null ,[ Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city :new FormControl(null ,[ Validators.required,Validators.minLength(3) , Validators.maxLength(10)])


  })

    detailsSubmit(){
      console.log(this.detailsForm.value);
        if (this.detailsForm.valid) {

      this._PaymentService.onlinePayment(this.CartID,this.detailsForm.value).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.status=="success"){
              window.open(res.session.url, '_self')

            }
            
          }

})
        }
    }


    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(res)=>{
         this.CartID = res.get('c_ID') !
        }
      })
    }
    

    // getUserAllOrders(){
    //   this._PaymentService.getUserOrders(this.CartID).subscribe({
    //     next:(res)=>{
    //       console.log(res);
    //     }
    //   })
    // }

}
