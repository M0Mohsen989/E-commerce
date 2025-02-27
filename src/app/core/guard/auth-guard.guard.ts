import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {

      const _router = inject(Router);
      const _PLATFORM_ID = inject(PLATFORM_ID);

      if (isPlatformBrowser(_PLATFORM_ID)) {

         if (sessionStorage.getItem('token')) {
          return true}
        else  {return _router.navigate(['/login']);}
      
      }

  return true;
};
