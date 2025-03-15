import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { SocialsSelectorComponent } from '../../ui/socials-selector/socials-selector.component';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormArray,
  UntypedFormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ContactsFormComponent } from '../../ui/contacts-form/contacts-form.component';
import { Socials } from '@shared/models/socials';
import { InputGroupModule } from 'primeng/inputgroup';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

enum ContactInfoPhases {
  SocialsSelectionPhase = 0,
  ContactInfoFormPhase = 1,
}

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  imports: [
    SocialsSelectorComponent,
    ContactsFormComponent,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputGroupModule,
  ],
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.scss',
})
export class ContactInfoFormComponent implements OnChanges {
  @Input() contactInfo: Socials[] = [];
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();
  selectedSocials: Socials[] = [];
  formGroup: FormGroup;
  phase: ContactInfoPhases;
  socialLinksVisible = false;
  loading: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private stepWizardService: StepWizardService,
    private cdr: ChangeDetectorRef,
  ) {
    this.phase = ContactInfoPhases.SocialsSelectionPhase;
    this.formGroup = this.formBuilder.group({
      contacts: this.formBuilder.array([]),
    });

    this.contacts.push(
      this.formBuilder.group({
        name: 'Email',
        value: '',
        disabled: false,
      }),
    );

    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.changed.emit(value);
        const { contacts } = value;
        this.stepWizardService.updateResumeData('contactInfo', contacts);
      });

    this.stepWizardService.contactInfoForm$.subscribe({
      next: (value) => {
        this.loading = true;
        // this.cdr.detectChanges();
        this.loading = false;
      },
    });
  }

  ngOnChanges() {}

  computeSocialContacts(socials: Socials[]) {
    for (const social of socials) {
      const socialLink = this.formBuilder.group({
        name: social.name,
        value: social.value,
        disabled: social.disabled,
      });
      this.contacts.push(socialLink);
    }
  }

  get contacts() {
    return this.formGroup.controls['contacts'] as UntypedFormArray;
  }

  finishSocialsSelectionPhase() {
    this.phase = ContactInfoPhases.ContactInfoFormPhase;
  }

  addSocialContact() {
    const contactSocial = this.formBuilder.group({
      name: [Math.random().toString(36).substring(7)],
      value: [''],
      disabled: false,
    });

    this.contacts.push(contactSocial);
  }

  private findAndDisableSocial(social: Socials) {
    for (const contact of this.contacts.value) {
      if (contact.name === social.name) {
        contact.disabled = true;
      }
    }
  }

  onSocialsAdded(social: Socials) {
    const incomingSocialExists = this.contacts.value.some(
      (contact: Socials) => contact.name === social.name,
    );
    if (incomingSocialExists) {
      this.findAndDisableSocial(social);
    } else {
      this.contacts.push(this.formBuilder.group(social));
    }

    this.socialLinksVisible = true;
    this.cdr.detectChanges();
  }

  disableControl(socialLabel: string) {
    const contacts = this.contacts.value;
    for (const contact of contacts) {
      if (contact.name === socialLabel) {
        contact.disabled = true;
      }
    }

    const allItemsDisabled = contacts.every((contact: Socials) => contact.disabled);
    this.socialLinksVisible = allItemsDisabled ? false : true;
    this.cdr.detectChanges();
  }
}
