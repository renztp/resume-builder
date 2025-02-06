import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { Socials } from '@shared/models/socials';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    InputGroupModule,
  ],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent {
  @Input() selectedSocials: Socials[] = [];
  @Input() formGroup: FormGroup = new FormGroup({});
  constructor() {
  }

  get contacts() {
    return this.formGroup.controls['contacts'] as FormArray;
  }
}
