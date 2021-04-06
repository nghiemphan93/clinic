import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, delay, map, retryWhen, take } from 'rxjs/operators';
import { ResponseError } from '../models/error/ResponseError';

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
    if (token != null) {
      authReq = request.clone({
        headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      retryWhen((errors) => {
        let retries = 0;
        return errors.pipe(
          delay(1000),
          take(5),
          map((error) => {
            if (retries++ === 4) {
              throw error;
            }
          })
        );
      }),
      catchError((err: ResponseError) => {
        console.log(`request failed with error: ${JSON.stringify(err)}`);
        return throwError(err);
      })
    );
  }
}
