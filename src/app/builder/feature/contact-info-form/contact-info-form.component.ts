import { Component, EventEmitter, Output } from "@angular/core";
import { SocialsSelectorComponent } from "../../ui/socials-selector/socials-selector.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  imports: [SocialsSelectorComponent],
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.scss'
})
export class ContactInfoFormComponent {
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();

  constructor() {}
}
