import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoggedUserService } from '../utils/logged-user.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  private countRequest = 0;
  private isModalOpen = new BehaviorSubject<boolean>(false);

  constructor(
    private loggedUserService: LoggedUserService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoading();

    const noAuthorizationEndpoints = ['/login'].some(endpoint => request.url.includes(endpoint));
    const token = this.loggedUserService.getLoggedUser()?.data?.token || null;

    if (!noAuthorizationEndpoints) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      request = request.clone({
        setHeaders: headers
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        return throwError(error);
      }),
      finalize(() => {
        this.hideLoading();
      })
    );
  }

  private showLoading() {
    // if (this.countRequest === 0) {
    //   this.loadingService.show();
    // }
    // this.countRequest++;
  }

  private hideLoading() {
    // this.countRequest--;
    // if (this.countRequest === 0) {
    //   this.loadingService.hide();
    // }
  }

}
