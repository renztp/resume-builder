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
import { AuthResponse } from '~/app/shared/models/auth';

@Component({
  selector: 'app-auth-register-page',
  templateUrl: './auth-register-page.component.html',
  styleUrl: './auth-register-page.component.scss',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class AuthRegisterPage {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
  ) {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      retypePassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  register() {
    this.authService.register(this.formGroup.value).subscribe({
      next: (resp: AuthResponse) => {
        this.authService.setToken(resp.token);
        const token = this.authService.getToken();
        console.log(`Token is ${token} hehehe`);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
