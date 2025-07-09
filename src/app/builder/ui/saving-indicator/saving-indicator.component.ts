import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { StepWizardService } from '../../../shared/data-access/step-wizard.service';

@Component({
  selector: 'app-saving-indicator',
  imports: [CommonModule],
  templateUrl: './saving-indicator.component.html',
  styleUrl: './saving-indicator.component.scss',
})
export class SavingIndicatorComponent {
  @Input() isSaving: boolean = false;

  constructor(private stepWizardService: StepWizardService) {
    this.stepWizardService.savingState$.subscribe((state) => {
      this.isSaving = state;
    });
  }
}
