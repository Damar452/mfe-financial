import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoggedUserService } from 'src/app/core/services/utils/logged-user.service';
import { SnackbarService } from 'src/app/core/services/utils/snackbar.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loggedUserServiceSpy: jasmine.SpyObj<LoggedUserService>;
  let snackbarServiceSpy: jasmine.SpyObj<SnackbarService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    loggedUserServiceSpy = jasmine.createSpyObj('LoggedUserService', ['saveLoggedUser']);
    snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['showErrorSnackbar']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: LoggedUserService, useValue: loggedUserServiceSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should mark the form as invalid if fields are empty', () => {
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as valid if fields are correctly filled', () => {
    component.loginForm.setValue({ email: 'test@email.com', password: '123456' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call AuthService login method on submit when form is valid', () => {
    const mockResponse = { id: 1, email: 'test@gmail.com', firstName: 'Cesar', lastName: 'Romero', token: '123abc' };
    authServiceSpy.login.and.returnValue(of(mockResponse));

    component.loginForm.setValue({ email: 'test@email.com', password: '123456' });
    component.onSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: 'test@email.com', password: '123456' });
    expect(loggedUserServiceSpy.saveLoggedUser).toHaveBeenCalledWith(mockResponse);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should show error snackbar if login fails', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('Error de autenticación')));

    component.loginForm.setValue({ email: 'wrong@email.com', password: 'wrongpass' });
    component.onSubmit();

    expect(snackbarServiceSpy.showErrorSnackbar).toHaveBeenCalledWith('Email o contraseña inválido!');
  });
});
