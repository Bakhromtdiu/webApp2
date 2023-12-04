import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.userStateSignal().jwt;
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {'Authorization': `Bearer ${token}`}
    });
    return next(clonedReq);
  }
  return next(req);
};
