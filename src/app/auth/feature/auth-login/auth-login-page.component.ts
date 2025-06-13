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

@Component({
  selector: 'app-auth-login-page',
  templateUrl: './auth-login-page.component.html',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule],
  styleUrl: './auth-login-page.component.scss',
  standalone: true,
})
export class AuthLoginPage {
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
