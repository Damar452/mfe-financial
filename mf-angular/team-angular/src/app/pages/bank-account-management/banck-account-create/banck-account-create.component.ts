import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/core/services/accounts.service';

@Component({
  selector: 'app-banck-account-create',
  templateUrl: './banck-account-create.component.html',
  styleUrls: ['./banck-account-create.component.scss']
})
export class BanckAccountCreateComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(private fb: FormBuilder, private accountsServices: AccountsService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
    });
  }

  createAccount() {
    if (this.accountForm.valid) {
      console.log('Nueva cuenta:', this.accountForm.value);
      this.accountsServices.createAccount(this.accountForm.value).subscribe({
        next: response => {
          console.log(response);
        }
      })
    }
  }
}
