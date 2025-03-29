import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginResponse } from "../interfaces/login.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  public getUsers(): Observable<LoginResponse[]> {
    return this._http.get<LoginResponse[]>(`${environment.API}/users`);
  }
}
