import { Component, Input } from '@angular/core';
import { StepWizardFooterComponent } from './step-wizard-footer/step-wizard-footer.component';
import { StepWizardBreadcrumbsComponent } from './step-wizard-breadcrumbs/step-wizard-breadcrumbs.component';

@Component({
  standalone: true,
  selector: 'step-wizard',
  imports: [StepWizardFooterComponent, StepWizardBreadcrumbsComponent],
  templateUrl: './step-wizard.component.html',
  styleUrl: './step-wizard.component.scss',
})
export class StepWizard {
  @Input() stepTitle: string;
  constructor() {
    this.stepTitle = '';
  }
}
