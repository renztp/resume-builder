import { CommonModule } from '@angular/common';
import { Component, Input, Output, SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
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
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { StepWizardService } from '@shared/data-access/step-wizard.service';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, InputGroupModule],
  templateUrl: './contacts-form.component.html',
  styleUrl: './contacts-form.component.scss',
})
export class ContactsFormComponent implements OnChanges {
  @Input() contactItems: Socials[] = [];
  @Input() selectedSocials: Socials[] = [];
  @Output() onFieldChange = new EventEmitter();

  loading: boolean = false;
  contactsFormGroup: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private stepWizardService: StepWizardService,
  ) {
    this.contactsFormGroup = this.formBuilder.group({
      contacts: this.formBuilder.array([]),
    });

    this.contactsFormGroup.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((allContacts: { contacts: Socials[] }) => {
        const validFields = allContacts.contacts.filter((contact) => contact.value);
        if (validFields.length === 0) {
          this.stepWizardService.updateResumeData('contactInfo', []);
        }
        this.stepWizardService.updateResumeData('contactInfo', validFields);
      });
  }

  ngOnInit() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['contactItems']) {
      this.processContacts();
    }
  }

  get availableContacts() {
    return this.contactItems.filter((contact) => !contact.disabled);
  }

  processContacts() {
    this.contacts.clear();
    this.contactItems.forEach((contact) => {
      if (!contact?.disabled) {
        const field = this.formBuilder.group({
          name: contact.name,
          value: contact.value,
        });
        this.contacts.push(field);
      }
    });
  }

  get contacts() {
    return this.contactsFormGroup.controls['contacts'] as FormArray;
  }
}
