import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error) => {
      switch (error.status) {
        case 401:
          // Token expirado o inválido
          auth.logout();
          router.navigate(['/login']);
          break;
        case 403:
          // Sin permisos
          router.navigate(['/main/dashboard']);
          break;
        case 0:
          // Error de conexión
          console.error('No se pudo conectar con el servidor');
          break;
        default:
          console.error('Error HTTP:', error.status, error.message);
      }
      return throwError(() => error);
    })
  );
};
