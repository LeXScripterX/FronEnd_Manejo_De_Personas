import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const userRole = (auth.getroles() || '')
      .replace(/"/g, '')
      .trim()
      .toUpperCase();

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate(['/main/dashboard']);
    return false;
  };
};
