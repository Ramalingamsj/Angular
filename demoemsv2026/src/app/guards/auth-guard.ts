import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { listenerCount } from 'node:process';

export const authGuard: CanActivateFn = (route, state) => {
  // route: The activated route snapshot
  // state - The router state snapshot
  // boolean : indicating if route can be activated

  // http://localhoat:4200/employees/edit/101
  // route - employees/edit/101
  // route.params = {id : 101} --- const empid = route.params['id'];
  // route.data: { role: '2'}

  // http://localhoat:4200/auth/admin
  // route - auth/admin
  // route.params = null
  // route.data: { role: '1'}
 const router = inject(Router);
 const platformId=inject(PLATFORM_ID);

 if(!isPlatformBrowser(platformId)){
  return true;
 }

  const token = localStorage.getItem("JWT_TOKEN");
  const currentRole = localStorage.getItem("ACCESS_ROLE");

  // 1. check login
  if (!token) {
    router.navigate(['auth/login']);
    return false;
  }

  // 2. check role (if defined)
  // const expectedRole = route.data?.['roles'] as string[];

  const expectedRole = route.data?.['roleid'];

  console.log(expectedRole);

  if (expectedRole && currentRole !== expectedRole) {
    localStorage.removeItem("USER_NAME");
    localStorage.removeItem("ACCESS_ROLE");
    localStorage.removeItem("JWT_TOKEN");
    router.navigate(['auth/login']);
    return false;

  }

  return true;
};
