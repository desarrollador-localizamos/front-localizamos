// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';
// import { AuthStatus } from '../interfaces';

// export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
//  const authService = inject(AuthService);
//  const router      = inject( Router );

//  console.log({status: authService.authStatus()});

//  if(authService.authStatus() === AuthStatus.authenticated){
//   console.log({status2: authService.authStatus()});
//   return true;

//  }else{
//   router.navigateByUrl('/dashboard');
//   console.log("entro al else");
//  }

// router.navigateByUrl('/');

// console.log({status3: authService.authStatus()});
// return false;

// };


import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
import { map } from 'rxjs';

// export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//  /* return authService.checkAuthStatus().pipe(
//     map((isAuthenticated) => {
//       console.log({ status: authService.authStatus() });
//       if (isAuthenticated && authService.authStatus() === AuthStatus.authenticated) {
//         return true;
//       } else {
//         router.navigateByUrl('/');
//         return false;
//       }
//     })
//   );*/
// };