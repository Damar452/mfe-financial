import { Routes } from '@angular/router';
import { BankAccountManagementComponent } from '../bank-account-management/bank-account-management.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

export const HomeRouting: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'bank-account-management',
        component: BankAccountManagementComponent
      },
      {
        path: 'transaction-history',
        component: TransactionHistoryComponent
      }
    ]
  },
]
