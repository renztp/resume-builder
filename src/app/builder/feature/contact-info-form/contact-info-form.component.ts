import { Component, EventEmitter, Output } from "@angular/core";
import { SocialsSelectorComponent } from "../../ui/socials-selector/socials-selector.component";
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { CommonModule } from "@angular/common";

enum ContactInfoPhases {
  SocialsSelectionPhase = 0,
  ContactInfoFormPhase = 1,
}

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  imports: [SocialsSelectorComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.scss'
})
export class ContactInfoFormComponent {
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();
  selectedSocials: string[] = [];
  formGroup: FormGroup;
  phase: ContactInfoPhases;

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) {
    this.phase = ContactInfoPhases.SocialsSelectionPhase;
    this.formGroup = this.formBuilder.group({
      contacts: this.formBuilder.array([]),
    })
  }

  get contacts() {
    return this.formGroup.get('contacts') as FormGroup;
  }

  finishSocialsSelectionPhase() {
    this.phase = ContactInfoPhases.ContactInfoFormPhase;
  }

  revertToSocialsSelectionPhase() {
    this.phase = ContactInfoPhases.SocialsSelectionPhase;
  }

  onSocialsToggled(socials: string[]) {
    this.selectedSocials = socials;

    // const newContact = this.formBuilder.group({


    // this.contacts.push()
  }
}
