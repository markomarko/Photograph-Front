import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { tap } from '../../../node_modules/rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = localStorage.access_token;

    if (jwt) {
      console.log(request);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      });
    }
    this.loader.show();

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.loader.hide();
          }
        },
        (err: any) => {
          this.loader.hide();
        }
      )
    );
  }
}
