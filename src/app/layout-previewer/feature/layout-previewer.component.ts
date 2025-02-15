import { Component } from '@angular/core';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { ResumeData } from '@shared/models/resume-data';
import pdfMake from 'pdfmake/build/pdfmake';
import { minimalLayout } from '../ui/layouts/minimal.layout.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layout-previewer',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './layout-previewer.component.html',
  styleUrl: './layout-previewer.component.scss'
})
export class LayoutPreviewerComponent {
  layout: string | null = '';
  resumeData: ResumeData = {
    basicInfo: {
      name: '',
      occupation: '',
      email: '',
      phoneNumber: '',
      location: '',
      bio: ''
    },
    contactInfo: [],
    workExperience: [],
    education: []
  };
  constructor(private stepWizardService: StepWizardService) {
    pdfMake.fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
      },
    }

    this.initResumeData();
    stepWizardService.resumeData$.subscribe({
      next: value => {
        this.resumeData = value;
        this.reloadResumeData();
      }
    })

    stepWizardService.layout$.subscribe({
      next: value => {
        this.layout = value;
      }
    })
  }

  applyIframeAttributes(dataUrl: string, iframe: HTMLIFrameElement) {
    iframe.src = dataUrl + "#toolbar=0";
    iframe.height = '100%';
    iframe.width = '95%';
    iframe.allowFullscreen = true;
    iframe.className = 'resume-iframe';
    iframe.frameBorder = '0';
  }

  initResumeData() {
    const layoutContent = minimalLayout(this.resumeData);
    const pdfDocGenerator = pdfMake.createPdf(layoutContent);
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector('#iframeContainer') as HTMLElement;
      const iframe = document.createElement('iframe');
      this.applyIframeAttributes(dataUrl, iframe);
      targetElement.appendChild(iframe);
    });
  }

  reloadResumeData() {
    const pdfDocGenerator = pdfMake.createPdf(minimalLayout(this.resumeData));
    pdfDocGenerator.getDataUrl((dataUrl) => {
      const targetElement = document.querySelector('iframe') as HTMLElement;
      const iframe = document.createElement('iframe');
      this.applyIframeAttributes(dataUrl, iframe);
      targetElement.replaceWith(iframe);
    });
  }

  downloadResume() {
    pdfMake.createPdf(minimalLayout(this.resumeData)).download();
  }
}
