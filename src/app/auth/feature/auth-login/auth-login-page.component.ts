import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule],
  styleUrl: './auth-login-page.component.scss',
  standalone: true,
})
export class AuthLoginPage {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onLoginSubmit() {
    this.authService.login(this.formGroup.value).subscribe({
      next: ({ data }) => {
        this.authService.setToken(data.token);
        console.log({ data });
        console.log(this.authService.getToken());
        const token = this.authService.getToken() || null;
        if (!!token) {
          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => console.error(error),
    });
  }
}
