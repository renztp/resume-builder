import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarComponent } from '../../../shared/ui/sidebar/sidebar.component';
import { LayoutPreviewerComponent } from '../../../layout-previewer/feature/layout-previewer.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasicInfoFormComponent } from "../basic-info-form/basic-info-form.component";
import { WorkExperienceFormComponent } from '../work-experience-form/work-experience-form.component';
import { ResumeData } from '../../../shared/models/resume-data';
import { EducationFormComponent } from '../education-form/education-form.component';
import { BasicInfo } from '../../../shared/models/basic';
import { WorkExperience } from '../../../shared/models/work-experience';
import { Education } from '../../../shared/models/education';
import { SidemenuComponent } from '../../../shared/ui/sidemenu/sidemenu.component';
import { StepWizardService } from '@shared/data-access/step-wizard.service';

@Component({
  selector: 'app-builder.page',
  standalone: true,
  imports: [FormsModule, CommonModule, TabMenuModule, SidebarComponent, LayoutPreviewerComponent, ButtonModule, BasicInfoFormComponent, WorkExperienceFormComponent, EducationFormComponent, SidemenuComponent],
  templateUrl: './builder.page.html',
  styleUrl: './builder.page.scss'
})
export class BuilderPageComponent {
  resumeData: ResumeData;
  basicInfo: BasicInfo;
  workExperience: WorkExperience[] = [];
  education: Education[] = [];
  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;
  statez: any = {};

  selectedLayout: string | null = null;

  constructor(private router: ActivatedRoute, private stepWizardService: StepWizardService) {
    this.resumeData = {
      basicInfo: {
        name: '',
        occupation: '',
        email: '',
        phoneNumber: '',
        location: '',
        bio: '',
        picture: ''
      },
      workExperience: [],
      education: []
    };
    this.basicInfo = {
      picture: '',
      name: '',
      occupation: '',
      email: '',
      phoneNumber: '',
      location: '',
      bio: ''
    };
    this.workExperience = [];
    this.education = [];

    // this.selectedLayout = this.stepWizardService.selectedLayout$().sub;
  }

  ngOnInit() {
    this.statez = this.router.snapshot?.params;
    this.items = [
      { label: 'Basic Info', icon: 'pi pi-home', title: 'basic-info' },
      { label: 'Work Experience', icon: 'pi pi-chart-line', title: 'work-experience' },
      { label: 'Education', icon: 'pi pi-list', title: 'education' },
      // { label: 'Misc', icon: 'pi pi-list', title: 'misc' },
    ];

    this.activeItem = this.items[0];
    this.setupResumeData();
  }

  setupResumeData() {
    this.stepWizardService.selectedLayout$.subscribe({
      next: (layout) => {
        this.selectedLayout = layout;
        console.log('layout', layout);
      },
      error: (error) => {
        console.log('error', error);
      },
    })
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  navigateNext() {
    const currentIndex = this.items.findIndex(item => item === this.activeItem);
    if (currentIndex < this.items.length - 1) {
      this.activeItem = this.items[currentIndex + 1];
    }
  }

  onDataChanged($event: any) {
    if($event.basicInfo) {
      this.basicInfo = $event.basicInfo;
    }

    if($event.workExperiences) {
      this.workExperience = $event.workExperiences;
    }

    if($event.educations) {
      this.education = $event.educations;
    }
  }
}
