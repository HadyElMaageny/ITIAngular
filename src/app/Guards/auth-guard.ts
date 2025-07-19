import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('token');

  if (isLoggedIn) {
    return true;
  } else {
    alert('You must log in');
    return router.createUrlTree(['login']);
  }
};
