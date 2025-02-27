import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent implements OnDestroy{

    respotext: any;
    resetuserPasswordSUB!:Subscription
    constructor(private _AuthService:AuthService,private _Router :Router){}
    succsessMessage:string = ''

    resetPasswordForm = new FormGroup({
    
      email: new FormControl(null , [Validators.required, Validators.email]),
      newPassword: new FormControl(null , [Validators.required,Validators.pattern(/^\w{6,}$/)]),
    
     })


     showresetPasswordForm():void{  
      if (this.resetPasswordForm.valid) {
    
      this.resetuserPasswordSUB=  this._AuthService.resetuserPassword(this.resetPasswordForm.value).subscribe({
          next: (data) =>{
             this.succsessMessage = data.message
              //  window.alert( this.succsessMessage)
              console.log(data)
              this._Router.navigate(['/login']) 
            },
          error: (err) => {
            this.respotext = err.error.message
            console.log(err)}
        })
      }
      else{
        this.resetPasswordForm.markAllAsTouched()
      }
      
      console.log(this.resetPasswordForm);
    
     }
    
     ngOnDestroy(): void {

      if (this.resetuserPasswordSUB) {this.resetuserPasswordSUB.unsubscribe() }
    }

}
