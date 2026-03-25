import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //"@param req----the outgoing HTTP request"
  //@param next ---the next handler in he interceptor chain
  //@returns Observable of the HTTP event

  const router = inject(Router);
  console.log('Intercepting....');

  //1/ Skip JWT for Login API
  if (req.url.includes('api/logins')) {
    console.log('Not checking JWT');
    return next(req);
  }

  //step 2. Get Token & role

  const token = localStorage.getItem('JWT_TOKEN');
  const hasAccessRole = localStorage.getItem('ACCESS_ROLE');

  let modifiedRequest = req;

  //3.Attach token if exists
  if (token && hasAccessRole) {
    modifiedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
    //4.Handle response & errors

    return next(modifiedRequest).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          handlUnauthorized(router);
        }
        return throwError(() => error);
      }),
    );
  
  function handlUnauthorized(router: Router): void {
    //clear auth data
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('ACCESS_ROLE');

    //Redirect to login (replace history)
    router.navigate(['/auth/login'], { replaceUrl: true });
  }
};