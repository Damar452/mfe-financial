import { Injectable } from "@angular/core";
import { LoginResponse } from "../../interfaces/login.interface";
import { AccountResponse, UsersAccounts } from '../../interfaces/account.interface';

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  public tranformDataUserBalance(users: LoginResponse[], accounts: AccountResponse[]): UsersAccounts[] {
    return accounts.map((account: AccountResponse) => {
      const user = users.find((u: LoginResponse) => u.id === account.userId);
      return {
        fullName: `${user?.firstName} ${user?.lastName}`,
        accountNumber: account.accountNumber,
        balance: account.balance,
      }
    })
  }
}
