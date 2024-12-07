import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { ResumeData } from '../../models/resume-data';
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { WorkExperience } from '../../models/work-experience';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-dynamic-form-array',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, EditorModule, FileUploadModule, ToastModule, ButtonModule, AccordionModule, CalendarModule, CheckboxModule],
  templateUrl: './dynamic-form-array.component.html',
  styleUrl: './dynamic-form-array.component.scss'
})
export class DynamicFormArrayComponent {
  @Input() workExperience: WorkExperience[] = [];
  @Output() changed = new EventEmitter<FormGroup>();
  formGroup: FormGroup;
  loading = true;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      workExperiences: this.formBuilder.array([]),
    })

    this.formGroup.valueChanges.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => this.changed.emit(value));
  }

  ngOnInit() {
    this.loading = true;
    if(this.workExperience.length > 0) {
      this.assignExistingWorkExperience(this.workExperience);
    } else {
      this.loading = false;
    }
  }

  private assignExistingWorkExperience(workExperience: WorkExperience[]) {
    const workExperienceArray = this.formGroup.get('workExperiences') as FormArray;
    workExperienceArray.clear();

    workExperience.forEach((work: any) => {
      const group = this.buildWorkExperienceGroup();
      Object.keys(group.controls).forEach(key => {
        group.patchValue({
          [key]: work[key]
        })
      })
      workExperienceArray.push(group);
    })
    this.loading = false;
  }

  private buildWorkExperienceGroup() {
    return this.formBuilder.group({
      companyName: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      present: [false],
      description: [null],
      url: [null],
      logo: [null]
    })
  }

  addWorkExperience() {
    const workExperience = this.formBuilder.group({
      companyName: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      present: [false],
      description: [null],
      url: [null],
      logo: [null]
    })

    this.workExperiences.push(workExperience);
  }

  get workExperiences() {
    return this.formGroup.controls['workExperiences'] as FormArray;
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  togglePresent(index: number) {
    const workExperience = this.workExperiences.at(index);
    const present = workExperience.get('present');
    present?.setValue(!present?.value);
    const endYear = workExperience.get('endYear');
    endYear?.disable();
    console.log(present?.value);
  }
}
