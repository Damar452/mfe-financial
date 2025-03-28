import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  public login(payload: LoginRequest): Observable<LoginResponse>{
   return this._http.post<any>(`${environment.API}/login`, payload);
  }
}
