import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CustomPasswordValidators } from '../../custom-validators/custom.password.validators';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ILogin,IToken } from '../../../models/seller';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { merge } from 'rxjs';
import { SnackbarService } from '../../services/sanckbar.service';
// import { JwtHelperService } from '@auth0/angular-jwt'

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  constructor(private loginService: AuthService,private snackbar:SnackbarService,private router:Router) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      CustomPasswordValidators.logPatternError(),
    ]),
  });
  get email() {
    return this.loginForm.get('email');
  }
  get errorMessageEmail(): string {
    const control = this.email;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Email is required!';
        case control.hasError('email'):
          return 'Please enter valid email';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get password() {
    return this.loginForm.get('password');
  }
  get errorMessagePassword(): string {
    const control = this.password;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Password is required!';
        case control.hasError('minlength'):
          return 'Minimum 8 characters are required.';
        case control.errors?.['noNumber']:
          return 'At least one number is required.';
        case control.errors?.['noSpecialChars']:
          return 'At least one special character is required.';
        case control.errors?.['noLowerCase']:
          return 'At least one lowercase character is required.';
        case control.errors?.['noUpperCase']:
          return 'At least one uppercase character is required.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      const loginCredentails = this.loginForm.value;
      this.loginService.userLogin(loginCredentails).subscribe({
        next: (responseData) => {
          console.log("login",responseData);
          this.snackbar.showSuccess('Login successfully!');
          sessionStorage.setItem('token', responseData.token); 
          sessionStorage.setItem('refreshToken', responseData.refreshToken);
           this.router.navigate(['/all-products'])
        },
        error: (err) => {
          console.error('Login error', err);
          this.snackbar.showError('invalid credentials');
        },
        complete: () => {
          console.info();
        },
      });
    }

    else{
      this.snackbar.showError("something went wrong")
    }
  }
}
