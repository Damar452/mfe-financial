import { Component, OnInit } from '@angular/core';
import { AccountResponse } from 'src/app/core/interfaces/account.interface';
import { AccountsService } from 'src/app/core/services/accounts.service';

@Component({
  selector: 'app-bank-account-management',
  templateUrl: './bank-account-management.component.html',
  styleUrls: ['./bank-account-management.component.scss']
})
export class BankAccountManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'acciones'];
  accountsData!: AccountResponse[];
  constructor(private accountsServices: AccountsService ){}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountsServices.getAccounts().subscribe({
      next: response =>{
        this.accountsData =response;
      }
    })
  }
}
