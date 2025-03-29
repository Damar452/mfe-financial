import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountResponse } from 'src/app/core/interfaces/account.interface';
import { AccountsService } from 'src/app/core/services/accounts.service';

@Component({
  selector: 'app-bank-account-management',
  templateUrl: './bank-account-management.component.html',
  styleUrls: ['./bank-account-management.component.scss'],
})
export class BankAccountManagementComponent implements OnInit {

  public accountsData!: AccountResponse[];
  public selectedAccount!: AccountResponse | null;

  constructor(
    private accountsServices: AccountsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('createAccountModal');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => {
        this.getAccounts();
      });
    }
  }

  private getIdUserLocalStorage() {
    const userData = localStorage.getItem("USER_DATA");
    return userData ? JSON.parse(userData).id : null;
  }

  public viewAcount(account: any) {
    this.selectedAccount = account;
    this.cdr.detectChanges();
  }

  public openCreateModal(): void {
    this.selectedAccount = null;
    this.cdr.detectChanges();
  }

  private getAccounts(): void {
    this.accountsServices.getAccounts(this.getIdUserLocalStorage()).subscribe({
      next: (response) => {
        this.accountsData = response;
      },
    });
  }
}
