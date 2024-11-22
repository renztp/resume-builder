import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { LayoutPreviewerComponent } from '../../layout-previewer/layout-previewer.component';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasicInfoFormComponent } from "../../basic-info-form/basic-info-form.component";
import { WorkExperienceFormComponent } from '../../work-experience-form/work-experience-form.component';
import { ResumeData } from '../../../models/resume-data';
import { EducationFormComponent } from '../../education-form/education-form.component';
import { BasicInfo } from '../../../models/basic';
import { WorkExperience } from '../../../models/work-experience';
import { Education } from '../../../models/education';

@Component({
  selector: 'app-builder.page',
  standalone: true,
  imports: [FormsModule, CommonModule, TabMenuModule, SidebarComponent, LayoutPreviewerComponent, ButtonModule, BasicInfoFormComponent, WorkExperienceFormComponent, EducationFormComponent],
  templateUrl: './builder.page.component.html',
  styleUrl: './builder.page.component.scss'
})
export class BuilderPageComponent {
  resumeData: ResumeData;
  basicInfo: BasicInfo;
  workExperience: WorkExperience[] = [];
  education: Education[] = [];
  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;
  statez: any = {};

  constructor(private router: ActivatedRoute) {
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
  }

  ngOnInit() {
    this.statez = this.router.snapshot?.params;
    console.log('statez', this.statez);
    this.items = [
      { label: 'Basic Info', icon: 'pi pi-home', title: 'basic-info' },
      { label: 'Work Experience', icon: 'pi pi-chart-line', title: 'work-experience' },
      { label: 'Education', icon: 'pi pi-list', title: 'education' },
      // { label: 'Misc', icon: 'pi pi-list', title: 'misc' },
    ];

    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
    console.log('activeItem', this.activeItem);
  }

  navigateNext() {
    const currentIndex = this.items.findIndex(item => item === this.activeItem);
    if (currentIndex < this.items.length - 1) {
      this.activeItem = this.items[currentIndex + 1];
      console.log('activeItem', this.activeItem);
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
