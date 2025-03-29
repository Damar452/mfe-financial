import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRouting } from './home.routing';
import { BankAccountManagementComponent } from '../bank-account-management/bank-account-management.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { BanckAccountCreateComponent } from '../bank-account-management/banck-account-create/banck-account-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BankAccountManagementComponent,
    TransactionHistoryComponent,
    BanckAccountCreateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(HomeRouting)
  ]
})
export class HomeModule { }
