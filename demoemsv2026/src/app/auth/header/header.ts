import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    //declare variables
  loginName?:string='';

  constructor(private authServices:AuthService){

  }
  ngOnInit():void{
    this.loginName=localStorage.getItem("USER_NAME")?.toString()
  }

  //call logout ()
  logOut():void{
    this.authServices.LogOutWithClearKeyValues();
  }

}
