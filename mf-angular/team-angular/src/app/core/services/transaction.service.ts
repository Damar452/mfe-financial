import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Transaction } from "../interfaces/transaction.interface";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

    constructor(private _http: HttpClient) { }

  public getTransactions(userId: number) {
   return this._http.get<Transaction[]>(`${environment.API}/transactions?userId=${userId}&?_sort=timestamp&_order=desc`);
  }
}
