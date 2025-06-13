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
  selector: 'app-auth-register-page',
  templateUrl: './auth-register.page.html',
  styleUrl: './auth-register.page.scss',
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class AuthRegisterPage {
  formGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.minLength(2)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
}
