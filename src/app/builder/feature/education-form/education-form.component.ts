import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumeData } from '../../../shared/models/resume-data';
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { Education } from '../../../shared/models/education';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, EditorModule, FileUploadModule, ToastModule, ButtonModule, AccordionModule, CalendarModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss'
})
export class EducationFormComponent {
  @Input() education: Education[] = [];
  @Output() changed = new EventEmitter<FormGroup>();
  formGroup: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      educations: this.formBuilder.array([]),
    })

    this.formGroup.valueChanges.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => this.changed.emit(value));
  }

  ngOnInit() {
    if(this.education?.length > 0) {
      this.assignExistingEducation(this.education);
    }
  }


  addEducation() {
    const education = this.formBuilder.group({
      schoolName: [null, [Validators.required]],
      degree: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      description: [null],
      logo: [null]
    })

    this.educations.push(education);
  }

  private assignExistingEducation(education: Education[]) {
    const educationArray = this.formGroup.get('educations') as FormArray;
    educationArray.clear();

    education.forEach((educationItem: any) => {
      const group = this.buildEducationGroup();
      Object.keys(group.controls).forEach(key => {
        group.patchValue({
          [key]: educationItem[key]
        })
      })
      educationArray.push(group);
    })
  }

  private buildEducationGroup() {
    return this.formBuilder.group({
      schoolName: [null, [Validators.required]],
      degree: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      description: [null],
      logo: [null]
    })
  }

  get educations() {
    return this.formGroup.controls['educations'] as FormArray;
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }
}
