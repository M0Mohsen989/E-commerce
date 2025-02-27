import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verifypassword',
  imports: [ReactiveFormsModule],
  templateUrl: './verifypassword.component.html',
  styleUrl: './verifypassword.component.scss'
})
export class VerifypasswordComponent  implements OnDestroy{
  respotext: any;
  constructor(private _AuthService:AuthService,private _Router :Router){}
  succsessMessage:string = ''

verfiyPasswordsub!:Subscription
    
    verfiyform = new FormGroup({
    
      resetCode : new FormControl(null, [Validators.required, Validators.minLength(5)])
    
     })
    
    
     showVerfiytForm():void{  
      if (this.verfiyform.valid) {
    
       this.verfiyPasswordsub= this._AuthService.verfiyCode(this.verfiyform.value ).subscribe({ 
          next: (data) =>{ 
             this.succsessMessage = data.message
            //  this.loading = false
            
            this._Router.navigate(['/reset-password'])
            console.log(data)},
          error: (err) => {
            this.respotext = err.error.message
            // this.loading = false
            console.log(err)}
        })
      }
      else{
        this.verfiyform.markAllAsTouched()
      }
      console.log(this.verfiyform);
    
     }
    
ngOnDestroy(): void {

  if (this.verfiyPasswordsub) {
    this.verfiyPasswordsub.unsubscribe()

  }
}
}
