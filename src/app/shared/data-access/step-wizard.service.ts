import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum Steps {
  BasicInfo = 0,
  WorkExperience = 1,
  Education = 2,
  Review = 3,
}

@Injectable({
  providedIn: 'root',
})
export class StepWizardService {
  private contactInfoForm = new BehaviorSubject<any[]>([]);
  private selectedLayout = new BehaviorSubject<string | null>(null);
  private resumeData = new BehaviorSubject<any>({
    basicInfo: {},
    contactInfo: [],
    workExperience: [],
    education: [],
  });
  layout$ = this.selectedLayout.asObservable();
  resumeData$ = this.resumeData.asObservable();
  contactInfoForm$ = this.contactInfoForm.asObservable();

  constructor() {}

  setSelectedLayout(layout: string) {
    this.selectedLayout.next(layout);
  }

  updateResumeData(key: string, data: any) {
    const modifiedData = { ...this.resumeData.getValue() };
    modifiedData[key] = data;
    this.resumeData.next(modifiedData);
  }

  updateContactInfoForm(data: any) {
    this.contactInfoForm.next(data);
  }
}
