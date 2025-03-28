import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BankAccountManagementComponent } from './pages/bank-account-management/bank-account-management.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'bank-account-management',
    component: BankAccountManagementComponent
  },
  {
    path: 'transaction-history',
    component: TransactionHistoryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
