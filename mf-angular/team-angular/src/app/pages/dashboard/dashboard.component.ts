import { Component, OnInit } from '@angular/core';
import {
  AccountResponse,
  UsersAccounts,
} from 'src/app/core/interfaces/account.interface';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { typeMap } from './constants/constants';
import { UsersService } from 'src/app/core/services/user.service';
import { HandleDataService } from 'src/app/core/services/utils/hanble.data.service';
import { forkJoin } from 'rxjs';
import { Transaction } from 'src/app/core/interfaces/transaction.interface';
import { TransactionService } from 'src/app/core/services/transaction.service';
import { LoggedUserService } from 'src/app/core/services/utils/logged-user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public accountsData: AccountResponse[] = [];
  public usersAccounts: UsersAccounts[] = [];
  public transactions: Transaction[] = [];
  public totalBalance: number = 0;
  public accountSelect: UsersAccounts | null = null;
  public highAmount = 5000;
  public lowAmount = 1000;

  constructor(
    private userService: UsersService,
    private accountService: AccountsService,
    private handleDataService: HandleDataService,
    private loggedUserService: LoggedUserService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit(): void {
    this.getAccounts();
    this.getUserWithBalancs();
    this.getTransaction();
  }

  public showSummaryAccount(accouint: UsersAccounts) {
    this.accountSelect = accouint;
  }

  public getAccounts() {
    this.accountService.getAccountsByUser(this.userLogger!.id).subscribe({
      next: (reponse: AccountResponse[]) => {
        this.sumTotalBalance(reponse);
        this.sumByAccountType(reponse);
      },
    });
  }

  public getUserWithBalancs() {
    forkJoin({
      users: this.userService.getUsers(),
      accounts: this.accountService.getAccountsByUser(this.userLogger!.id),
    }).subscribe(({ users, accounts }) => {
      this.usersAccounts = this.handleDataService.tranformDataUserBalance(
        users,
        accounts
      );
    });
  }

  getTransaction() {
    this.transactionService.getTransactions(this.userLogger!.id).subscribe({
      next: (reponse: Transaction[]) => {
        this.transactions = reponse;
      },
    });
  }

  public sumTotalBalance(accounts: AccountResponse[]) {
    this.totalBalance = accounts.reduce(
      (acc, account) => acc + account.balance,
      0
    );
  }

  public sumByAccountType(accounts: AccountResponse[]): Record<string, number>[] {
    const summary: Record<string, number> = {};

    for (const account of accounts) {
      const key = typeMap[account.accountType];
      if (!summary[key]) {
        summary[key] = 0;
      }
      summary[key] += account.balance;
    }

    return [summary];
  }

  private get userLogger() {
    return this.loggedUserService.getLoggedUser();
  }
}
