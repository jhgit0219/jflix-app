import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('idToken');

    if (idToken) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
