import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountResponse } from 'src/app/core/interfaces/account.interface';
import { AccountsService } from 'src/app/core/services/accounts.service';
import { LoggedUserService } from 'src/app/core/services/utils/logged-user.service';

@Component({
  selector: 'app-banck-account-create',
  templateUrl: './banck-account-create.component.html',
  styleUrls: ['./banck-account-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BanckAccountCreateComponent implements OnInit {

  @Input() selectedAccount: AccountResponse | null = null;
  public accountForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private accountsServices: AccountsService,
    private loggedUserService: LoggedUserService
  ) {}

  ngOnChanges(change: any) {
    this.selectedAccount = change.selectedAccount.currentValue;
    this.buildForm();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.accountForm = this.fb.group({
      userId: [
        this.selectedAccount?.userId || this.loggedUserService.getLoggedUser()!.id,
        Validators.required,
      ],
      accountNumber: [
        this.selectedAccount?.accountNumber || '',
        Validators.required,
      ],
      accountType: [
        this.selectedAccount?.accountType || '',
        Validators.required,
      ],
      balance: [
        this.selectedAccount?.balance || 0,
        [Validators.required, Validators.min(0)],
      ],
      createdAt: [
         this.selectedAccount?.createdAt || new Date(),
        [Validators.required]]
    });
  }

  public createAccount(): void {
    if (this.accountForm.valid) {
      this.accountsServices.createAccount(this.accountForm.value).subscribe({
        next: (response) => {
          const modalElement = document.getElementById('createAccountModal');
          if (modalElement) {
            const modalInstance =
              (window as any).bootstrap.Modal.getInstance(modalElement) ||
              new (window as any).bootstrap.Modal(modalElement);
            modalInstance.hide();
            this.accountForm.reset();
          }
        },
      });
    }
  }
}
