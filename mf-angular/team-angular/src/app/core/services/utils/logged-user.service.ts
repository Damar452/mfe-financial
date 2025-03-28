import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  private readonly storageKey: string = 'USER_DATA';

  constructor() { }

  public saveLoggedUser(data: any) {
    window.localStorage.setItem(this.storageKey, data);
  }

  public getLoggedUser(): any {
    const data = window.localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  public removeLoggedUser() {
    window.localStorage.removeItem(this.storageKey);
  }
}
