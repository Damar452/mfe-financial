import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoggedUserService } from '../utils/logged-user.service';
import { LoadingService } from '../utils/loading.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private countRequest = 0;

  constructor(
    private loggedUserService: LoggedUserService,
    private loadingService: LoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoading();

    const noAuthorizationEndpoints = ['/login'].some(endpoint => request.url.includes(endpoint));
    const token = this.loggedUserService.getLoggedUser()?.token || null;

    if (!noAuthorizationEndpoints) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.hideLoading();
      })
    );
  }

  private showLoading() {
    if (this.countRequest === 0) {
      this.loadingService.show();
    }
    this.countRequest++;
  }

  private hideLoading() {
    this.countRequest--;
    if (this.countRequest === 0) {
      this.loadingService.hide();
    }
  }
}
