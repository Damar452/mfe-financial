import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/core/interfaces/login.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoggedUserService } from 'src/app/core/services/utils/logged-user.service';
import { SnackbarService } from 'src/app/core/services/utils/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loggedUserService: LoggedUserService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: LoginResponse) => {
          this.loggedUserService.saveLoggedUser(response);
          this.router.navigate(['dashboard']);
        },
        error: (error) => {
          this.snackbarService.showErrorSnackbar('Email o contraseña inválido!');
        }
      })
    }
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
}
