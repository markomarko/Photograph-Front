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
import { tap } from 'rxjs/operators';
import { SuspendedUserModalService } from '../suspendedUserModal/suspendedUserModal.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService, private suspendedUserModal: SuspendedUserModalService) {}
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
          this.checkErrorCode(err.error);
        }
      )
    );
  }

  private checkErrorCode(errorCode: string) {
    if (errorCode == '101') {
      this.suspendedUserModal.show();
    }
  }
}
