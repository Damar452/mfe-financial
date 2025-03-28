import { Injectable } from '@angular/core';
import { LoginResponse } from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private readonly storageKey: string = 'USER_DATA';

  constructor() { }

  public saveLoggedUser(data: LoginResponse) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  public getLoggedUser(): LoginResponse | null {
    const data = window.localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  public removeLoggedUser() {
    window.localStorage.removeItem(this.storageKey);
  }
}
