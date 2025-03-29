import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/core/services/utils/logged-user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    private loggedUserService: LoggedUserService,
    private router: Router
  ) {}

  get userName() {
    const { firstName, lastName } = this.loggedUserService.getLoggedUser()!;
    return `${firstName} ${lastName}`
  }

  public logout() {
    this.loggedUserService.removeLoggedUser();
    this.router.navigate(['login']);
  }
}
