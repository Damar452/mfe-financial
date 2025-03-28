import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUserService } from '../services/utils/logged-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private loggedUserService: LoggedUserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userSesion = this.loggedUserService.getLoggedUser();
    if (userSesion) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
