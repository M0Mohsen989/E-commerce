import { AuthService } from './../../core/services/authentication/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  respotext:string = ''
  succsessMessage:string = ''
  loading:boolean = false
  signinsub!:Subscription

  constructor(private _AuthService: AuthService, private router: Router) { } 
loginForm = new FormGroup({

  email: new FormControl(null , [Validators.required, Validators.email]),
  password: new FormControl(null , [Validators.required,Validators.pattern(/^\w{6,}$/)]),

 })

 

 showLoginForm():void{  
  if (this.loginForm.valid) {

  
    this.signinsub=  this._AuthService.signIn(this.loginForm.value).subscribe({
      next: (data) =>{
         this.succsessMessage = data.message
         this.loading = false
        
         sessionStorage.setItem('token', data.token)

         this._AuthService.decodeToken()
        //  window.alert( this.succsessMessage)
         this.router.navigate(['/home']) 
        console.log(data)},
      error: (err) => {
        this.respotext = err.error.message
        this.loading = false
        console.log(err)}
    })
  }
  else{
    this.loginForm.markAllAsTouched()
  }
  
  console.log(this.loginForm);

 }


 goToForgetPassword(){
  this.router.navigate(['/forget-password'])
 }

 ngOnDestroy(): void {
  if (this.signinsub) {
   this.signinsub.unsubscribe()}
    
 }
}
