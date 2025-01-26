import { Component, EventEmitter, Output } from "@angular/core";
import { SocialsSelectorComponent } from "../../ui/socials-selector/socials-selector.component";
import { FormGroup } from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-contact-info-form',
  standalone: true,
  imports: [SocialsSelectorComponent, CommonModule],
  templateUrl: './contact-info-form.component.html',
  styleUrl: './contact-info-form.component.scss'
})
export class ContactInfoFormComponent {
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();
  selectedSocials: string[] = [];

  constructor() {}

  onSocialsToggled(socials: string[]) {
    this.selectedSocials = socials;
  }
}
