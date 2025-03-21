import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StepWizard } from '../step-wizard/step-wizard.component';
import { SidebarComponent } from './shared/ui/sidebar/sidebar.component';
import { LayoutPreviewerComponent } from './layout-previewer/feature/layout-previewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StepWizard, SidebarComponent, LayoutPreviewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'resume-builder';
  currentStep = {
    step: 'basic-info',
  };
}
