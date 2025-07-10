import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { EditorModule } from 'primeng/editor';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { WorkExperience } from '../../../shared/models/work-experience';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AccordionModule, AccordionTabOpenEvent } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-work-experience-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    ToastModule,
    ButtonModule,
    AccordionModule,
    CalendarModule,
    CheckboxModule,
    TextareaModule,
  ],
  providers: [MessageService],
  templateUrl: './work-experience-form.component.html',
  styleUrl: './work-experience-form.component.scss',
  standalone: true,
})
export class WorkExperienceFormComponent {
  workExperience: WorkExperience[] = [];
  @Output() changed = new EventEmitter<FormGroup>();
  activeIndex: number[] = [];
  formGroup: FormGroup;
  loading = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private stepWizardService: StepWizardService,
  ) {
    this.formGroup = this.formBuilder.group({
      workExperiences: this.formBuilder.array([]),
    });

    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.changed.emit(value);
        const { workExperiences } = value;
        this.stepWizardService.updateResumeData('workExperience', workExperiences);
      });

    this.loadWorkExperiences();
  }

  ngOnInit() {
    this.loading = true;
    if (this.workExperience.length > 0) {
      this.assignExistingWorkExperience(this.workExperience);
    } else {
      this.loading = false;
    }
  }

  private loadWorkExperiences() {
    this.stepWizardService.resumeData$.subscribe(({ workExperience }) => {
      if (workExperience?.length > 0) {
        this.workExperience = workExperience;
      } else {
        this.loading = false;
      }
    });
  }

  private assignExistingWorkExperience(workExperience: WorkExperience[]) {
    const workExperienceArray = this.formGroup.get('workExperiences') as FormArray;
    workExperienceArray.clear();

    workExperience.forEach((work: any) => {
      const group = this.buildWorkExperienceGroup();
      Object.keys(group.controls).forEach((key) => {
        group.patchValue({
          [key]: work[key],
        });
      });
      workExperienceArray.push(group);
    });
    this.loading = false;
  }

  private buildWorkExperienceGroup() {
    return this.formBuilder.group({
      companyName: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      present: [null],
      description: [null],
      url: [null],
    });
  }

  addWorkExperience() {
    const workExperience = this.formBuilder.group({
      companyName: [null, [Validators.required]],
      occupation: [null, [Validators.required]],
      startYear: [null, [Validators.required]],
      endYear: [null],
      present: [null],
      description: [null],
      url: [null],
    });

    this.workExperiences.push(workExperience);
  }

  get workExperiences() {
    return this.formGroup.controls['workExperiences'] as FormArray;
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  addOrRemoveActiveIndex(activeIndex: number) {
    const index = this.activeIndex.indexOf(activeIndex);
    if (index > -1) {
      this.activeIndex.splice(index, 1);
    } else {
      this.activeIndex.push(activeIndex);
    }
  }

  onClose(event: AccordionTabOpenEvent) {
    this.addOrRemoveActiveIndex(event.index);
  }

  onOpen(event: AccordionTabOpenEvent) {
    this.addOrRemoveActiveIndex(event.index);
  }

  togglePresent(index: number) {
    const workExperience = this.workExperiences.at(index);
    const present = workExperience.get('present');
    const endYear = workExperience.get('endYear');
    present?.value?.length > 0 ? endYear?.disable() : endYear?.enable();
  }
}
