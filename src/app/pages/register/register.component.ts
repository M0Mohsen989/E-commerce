
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import e from 'express';
import { AuthService } from '../../core/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  respotext:string = ''
  succsessMessage:string = ''
  loading:boolean = false

constructor(private _AuthService:AuthService , private _router: Router) { }
registerForm = new FormGroup({

  name: new FormControl(null, [Validators.required, Validators.minLength(3) , Validators.maxLength(10)]),
  email: new FormControl(null , [Validators.required, Validators.email]),
  password: new FormControl(null , [Validators.required,Validators.pattern(/^\w{6,}$/)]),
  rePassword: new FormControl(null),
  phone : new FormControl(null , [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
} , this.matchpasswords)

      showForm():void{
       if(this.registerForm.valid){
        this.loading = true
        this._AuthService.signUp(this.registerForm.value).subscribe({
          next: (data) =>{ console.log(data)
            this.succsessMessage = data.message
            this.loading = false
            this._router.navigate(['/login'])      


          },
          error: (err) => {
            this.respotext = err.error.message
            console.log(err.error.message)
             this.loading = false
          }
        })
       
      } else{
        this.registerForm.markAllAsTouched()
        this.registerForm.setErrors({missMatch:true})
      }


    
    }
      matchpasswords(group:AbstractControl){

    if (group.get('password')?.value === group.get('rePassword')?.value) {
      
      return null  
    }  
    else
     {
      return {missMatch:true}
    } 


}
}