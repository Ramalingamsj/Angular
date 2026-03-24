import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm!:FormGroup

isSubmitted:boolean=false;
errorMessage:string='';

  constructor (private formBuilder:FormBuilder,
    private router:Router,
  public authService:AuthService){

    }
  
    ngOnInit():void{
      //Create reactive form--RxJS Valiadation
      this.loginForm=this.formBuilder.group(
        {
          username:['',[Validators.required]],//RxJS validatio
          password:['',Validators.required]
        }
      );
    }
    //1-get all controls of loginform for validation
    get getAllformControls(){
      return this.loginForm.controls;
    }


    //2-login functionality
    //based on roleId redirect to the respective dashboard
    checkLoginCredentials():void{
      //setting is submitted
      this.isSubmitted=true;
      if(this,this.loginForm?.invalid){
        this.errorMessage='';
        console.log(this.loginForm.value)
       //call REST API to check Username and Password
        this.authService.loginVerify(this.loginForm.value).subscribe(
        (response:any)=>{
          console.log(response);
          //Based on Role need to redirect
          if(response.roleId===1){
            console.log("Admin");
            //local storage
            localStorage.setItem("USER_NAME",response.uName);
            localStorage.setItem("ACCESS_ROLE",response.roleId.tostring());
            localStorage.setItem("JWT_TOKEN",response.token);
            //Redirect to ADMIN
            this.router.navigate(['auth/admin']);
          }else if(response.RoleId===2){
          //localStorage
            localStorage.setItem("USER_NAME",response.uName);
            localStorage.setItem("ACCESS_ROLE",response.roleId.tostring());
            localStorage.setItem("JWT_TOKEN",response.token);
             //Redirect to ADMIN
            this.router.navigate(['auth/manager']);
           } else{
this.errorMessage="Sorry ! InValid Credentials  not allowed"
        }
     },
    (error:any)=>{
      console.log(error);
      this.errorMessage="Sorry! InValid Credentials";
    });
      }
      
    }
    }
    //check for, is valid .. then proceeds and redirect to the dashboard
    
