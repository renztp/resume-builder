import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { StepWizardService } from '../shared/data-access/step-wizard.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-setup.page',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule, RouterLink, FileUploadModule],
  templateUrl: './setup.page.component.html',
  styleUrl: './setup.page.component.scss',
})
export class SetupPageComponent {
  jsonModalVisibility: boolean = false;

  constructor(
    private router: Router,
    private stepWizardService: StepWizardService,
  ) {}

  showDialog() {
    this.jsonModalVisibility = true;
  }

  onUpload(event: any) {
    const file = event.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const jsonObject = JSON.parse(fileReader.result as string);
      if (!!jsonObject) {
        this.stepWizardService.uploadResumeData(jsonObject);
        this.router.navigate(['/builder']);
      }
    };

    fileReader.readAsText(file);
  }
}
