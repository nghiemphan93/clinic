import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, delay, map, retryWhen, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  TOKEN_HEADER_KEY = 'Authorization';

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;
    const token = this.authService.getToken();
    if (token) {
      authReq = request.clone({
        headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }),
      retryWhen((errors) => {
        const MAX_RETRY = 5;
        let retries = 0;
        return errors.pipe(
          delay(1000),
          take(MAX_RETRY),
          map((error) => {
            if (retries++ === MAX_RETRY - 1) {
              throw error;
            }
          })
        );
      }),
      catchError((err) => {
        console.log(`request failed with error: ${JSON.stringify(err)}`);
        if (err.error) {
          return throwError(err.error);
        }
        return throwError(err);
      })
    );
  }
}
