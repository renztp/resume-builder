import { Component, Input } from '@angular/core';
import { StepWizardFooterComponent } from './step-wizard-footer/step-wizard-footer.component';

@Component({
  selector: 'step-wizard',
  imports: [StepWizardFooterComponent],
  templateUrl: './step-wizard.component.html',
  styleUrl: './step-wizard.component.scss',
  standalone: true,
})
export class StepWizard {
  @Input() stepTitle: string;
  constructor() {
    this.stepTitle = '';
  }
}
