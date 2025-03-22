import { CommonModule } from '@angular/common';
import { Component, Input, Output, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { Socials } from '@shared/models/socials';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputGroupModule],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent {
  @Input() contactItems: Socials[] = [];
  @Input() selectedSocials: Socials[] = [];

  loading: boolean = false;
  contactsFormGroup: FormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.contactsFormGroup = this.formBuilder.group({
      contacts: this.formBuilder.array([]),
    });
  }

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['contactItems']) {
      this.contactsFormGroup = this.formBuilder.group({
        contacts: this.formBuilder.array([]),
      });
      this.processContacts();
    }
  }

  processContacts() {
    this.contactItems.forEach((contact) => {
      const field = this.formBuilder.group({
        name: contact.name,
        value: contact.value,
      });
      if (contact.disabled) {
        field.disable();
      }
      this.contacts.push(field);
    });
  }

  get contacts() {
    return this.contactsFormGroup.controls['contacts'] as FormArray;
  }
}
