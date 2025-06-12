import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  DialogClosePayload,
  SocialsSelectorComponent,
} from '../../ui/socials-selector/socials-selector.component';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ContactsFormComponent } from '../../ui/contacts-form/contacts-form.component';
import { Socials } from '@shared/models/socials';
import { InputGroupModule } from 'primeng/inputgroup';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-contact-info-form',
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
  standalone: true,
})
export class ContactInfoFormComponent implements OnInit {
  @Input() existingContactsInfo: Socials[] = [];
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();
  contacts: Socials[] = [];
  preSelectedContacts: Socials[] = [];
  formContacts: Socials[] = [];
  socialLinksVisible = false;
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder) {}

  ngOnInit() {}

  handleOnCloseDialog(event: DialogClosePayload) {
    const { dialogVisibility, selectedNodes = [] } = event;

    if (selectedNodes?.length === 0) {
      this.formContacts = [];
      this.socialLinksVisible = dialogVisibility;
      return;
    }
    const processedContacts = this.processContacts(selectedNodes);
    this.formContacts = processedContacts;
    this.socialLinksVisible = dialogVisibility;
  }

  processContactDiffs(currentSelectedContacts: TreeNode[]): void {
    const modifiedSelectedContacts: Socials[] = currentSelectedContacts.map((contact) => ({
      name: contact.label ? contact.label : '',
      disabled: false,
      value: contact?.data?.value ?? '',
    }));

    if (modifiedSelectedContacts.length === 0 && this.contacts.length > 0) {
      this.contacts.forEach((contact) => {
        contact.disabled = true;
      });
      return;
    }

    if (this.contacts.length === 0) {
      this.contacts = modifiedSelectedContacts;
      return;
    }

    if (this.contacts.length > modifiedSelectedContacts.length) {
      this.disableCurrentContacts(this.contacts, modifiedSelectedContacts);
    }

    const activeContacts = this.contacts.filter((contact) => !contact.disabled);
    if (modifiedSelectedContacts.length > activeContacts.length) {
      this.enableCurrentContacts(this.contacts, modifiedSelectedContacts);

      // TODO: This might be removed if just adding all available contacts OnInit instead of adding new contacts
      const newContactsToAdd = modifiedSelectedContacts.filter(
        (currentSelectedContact) =>
          !this.contacts.some((contact) => currentSelectedContact.name === contact.name),
      );

      if (newContactsToAdd.length > 0) {
        newContactsToAdd.forEach((newContact) => this.contacts.push(newContact));
      }
    }
  }

  disableCurrentContacts(currentContacts: Socials[], incomingContacts: Socials[]): void {
    const filteredContacts = currentContacts.filter(
      (contact) =>
        !incomingContacts.some(
          (currentSelectedContact) => contact.name === currentSelectedContact.name,
        ),
    );
    filteredContacts.forEach((filteredContact) => (filteredContact.disabled = true));
  }

  enableCurrentContacts(currentContacts: Socials[], incomingContacts: Socials[]): void {
    const contactsToEnable = incomingContacts.filter((incomingContact) =>
      currentContacts.some(
        (contact) =>
          contact.name === incomingContact.name && contact.disabled !== incomingContact.disabled,
      ),
    );

    if (contactsToEnable.length > 0) {
      contactsToEnable.forEach((contactToEnable) => {
        const inactiveContact = currentContacts.find(
          (contact) => contact.name === contactToEnable.name,
        );
        if (inactiveContact) {
          inactiveContact.disabled = false;
        }
      });
    }
  }

  processContacts(selectedContacts: TreeNode[]): Socials[] {
    this.processContactDiffs(selectedContacts);

    const activeContacts = this.contacts.filter((contact) => !contact.disabled);
    if (activeContacts.length > 0) {
      return activeContacts;
    } else {
      return [];
    }
  }
}
