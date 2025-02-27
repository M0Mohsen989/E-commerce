import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services/authentication/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent implements OnDestroy{
  respotext: any;
  // loading: boolean;

  forgetPasswordSub!:Subscription

  constructor(private _AuthService:AuthService,private _Router :Router){}

  succsessMessage:string = ''


forgetForm = new FormGroup({

  email: new FormControl(null , [Validators.required, Validators.email])

 })


 showForgetForm():void{  
  if (this.forgetForm.valid) {

   this.forgetPasswordSub= this._AuthService.forgetUserPassword(this.forgetForm.value ).subscribe({ 
      next: (data) =>{ 
         this.succsessMessage = data.message
        //  this.loading = false
        
        this._Router.navigate(['/verfiy-code'])
        console.log(data)},
      error: (err) => {
        this.respotext = err.error.message
        // this.loading = false
        console.log(err)}
    })
  }
  else{
    this.forgetForm.markAllAsTouched()
  }
  console.log(this.forgetForm);

 }
ngOnDestroy(): void {

  if (this.forgetPasswordSub) {
    this.forgetPasswordSub.unsubscribe()
    
  }

}
}
