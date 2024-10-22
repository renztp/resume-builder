import { Component, Input } from '@angular/core';
import { ResumeData } from '../../models/resume-data';
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-work-experience-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, EditorModule, FileUploadModule, ToastModule, ButtonModule],
  templateUrl: './work-experience-form.component.html',
  styleUrl: './work-experience-form.component.scss'
})
export class WorkExperienceFormComponent {
  @Input() resumeData: ResumeData = {};
  formGroup: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      workExperience: this.formBuilder.array([])
    })
  }

  addWorkExperience() {
    const workExperience = this.formBuilder.group({
          companyName: [null, [Validators.required]],
          occupation: [null, [Validators.required]],
          startYear: [null, [Validators.required]],
          endYear: [null],
          description: [null],
          url: [null],
          logo: [null]
    })

    this.workExperience.push(workExperience);
  }

  get workExperience() {
    return this.formGroup.controls['workExperiences'] as FormArray;
  }
}
