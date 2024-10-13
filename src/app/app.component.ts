import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasicInfoStepComponent } from './basic-info-step/basic-info-step.component';
import { StepWizard } from '../step-wizard/step-wizard.component';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { LayoutPreviewerComponent } from "../components/layout-previewer/layout-previewer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BasicInfoStepComponent, StepWizard, SidebarComponent, LayoutPreviewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resume-builder';
  currentStep = {
    step: 'basic-info'
  };
}
