import { Component, effect, SimpleChange, SimpleChanges } from '@angular/core';

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
import { BasicInfo } from '../../../models/basic';
import { WorkExperience } from '../../../models/work-experience';
import { Education } from '../../../models/education';

interface ResumeData {
  basicInfo?: BasicInfo;
  workExperience?: WorkExperience[];
  education?: Education[];
}

@Component({
  selector: 'app-builder.page',
  standalone: true,
  imports: [FormsModule, CommonModule, TabMenuModule, SidebarComponent, LayoutPreviewerComponent, ButtonModule, BasicInfoFormComponent, WorkExperienceFormComponent],
  templateUrl: './builder.page.component.html',
  styleUrl: './builder.page.component.scss'
})
export class BuilderPageComponent {
  resumeData: ResumeData = {};
  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;
  statez: any = {};

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.statez = this.router.snapshot?.params;
    console.log('statez', this.statez);
    this.items = [
      { label: 'Basic Info', icon: 'pi pi-home', title: 'basic-info' },
      { label: 'Work Experience', icon: 'pi pi-chart-line', title: 'work-experience' },
      { label: 'Education', icon: 'pi pi-list', title: 'education' },
      { label: 'Misc', icon: 'pi pi-list', title: 'misc' },
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
    console.log($event);
  }
}
