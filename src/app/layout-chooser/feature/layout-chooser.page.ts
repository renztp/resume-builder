import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-layout-chooser.page',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, ButtonModule, RouterLink],
  templateUrl: './layout-chooser.page.html',
  styleUrl: './layout-chooser.page.scss',
})
export class LayoutChooserPageComponent {
  layout!: string;
  selectedLayout!: string | null;

  allLayouts = [
    {
      value: 'minimal',
      imageUrl: '../../../assets/images/layout-1.png',
    },
    {
      value: 'linear',
      imageUrl: '../../../assets/images/layout-2.png',
    },
    {
      value: 'detailed',
      imageUrl: '../../../assets/images/layout-3.png',
    },
  ];

  constructor(
    private router: Router,
    private stepWizardService: StepWizardService,
  ) {}

  changeSelectedLayout(layout: string) {
    this.layout = layout;
    this.stepWizardService.setSelectedLayout(this.layout);
  }

  navigateBuilder() {
    this.router.navigate(['/builder']);
  }
}
