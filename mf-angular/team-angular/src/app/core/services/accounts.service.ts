import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountResponse } from '../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private _http: HttpClient) { }

  public getAccountsByUser(userId: number): Observable<any> {
    return this._http.get<any>(`${environment.API}/accounts?userId=${userId}`);
  }

  public getAccounts(userId: number): Observable<AccountResponse[]> {
    return this._http.get<any>(`${environment.API}/accounts?userId=${userId}`);
  }

  public createAccount(payload: any): Observable<AccountResponse> {
    return this._http.post<any>(`${environment.API}/accounts`, payload);
  }
}
