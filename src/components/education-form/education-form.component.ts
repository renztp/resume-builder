import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResumeData } from '../../models/resume-data';
import { FormArray, FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccordionModule } from 'primeng/accordion';
import { Education } from '../../models/education';

@Component({
  selector: 'app-education-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, EditorModule, FileUploadModule, ToastModule, ButtonModule, AccordionModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss'
})
export class EducationFormComponent {
  @Input() education?: Education[];
  @Output() changed = new EventEmitter<FormGroup>();
  formGroup: FormGroup;
  foo: any;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      educations: this.formBuilder.array([]),
    })

    this.formGroup.valueChanges.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => this.changed.emit(value));
  }

  ngOnInit() {
    if(this.education) {
      this.assignExistingEducation(this.education);
    }
  }


  private assignExistingEducation(education?: Education[]) {
    if(education) {
      this.formGroup.patchValue(education)
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

  get educations() {
    return this.formGroup.controls['educations'] as FormArray;
  }

  removeEducation(index: number) {
    this.educations.removeAt(index);
  }
}
