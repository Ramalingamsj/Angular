import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private httpClient:HttpClient,private router:Router){

    //1-Login --Verify Credentials Username and Password
    
  }
  public loginVerify(user:User):Observable<any>{
    //call WebAPI for checking username and password
    //https://localhost:7186/api/Logins/Admin/admin%40123
return this.httpClient.get<User>(environment.apiUrl+'Login/'
  +user.username+'/'+user.password);
  }

  //2-logout functionality
  public LogOutWithClearKeyValues(){
    //clear all sessions and localstorage keys
    localStorage.removeItem('USER_NAME');
    localStorage.removeItem('ACCESS_ROLE');
    localStorage.removeItem('JWT_TOKEN');

    //redirect the login
     this.router.navigate(['auth/login']);

  }
  //3.check if the user is currently logged in 
  isLoggedIn():boolean{
    return localStorage.getItem('USER_NAME')!=null;
  }
}
