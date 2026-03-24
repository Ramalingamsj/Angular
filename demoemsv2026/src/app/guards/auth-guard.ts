import { CanActivateFn } from '@angular/router';

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
  
  return true;
};
