import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BasicInfo } from '../../../shared/models/basic';

@Component({
  selector: 'app-basic-info-form',
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    CommonModule,
    ImageModule,
    TextareaModule,
  ],
  providers: [MessageService, HttpClient],
  templateUrl: './basic-info-form.component.html',
  styleUrl: './basic-info-form.component.scss',
  standalone: true,
})
export class BasicInfoFormComponent {
  @Input() basicInfo: BasicInfo = {
    name: '',
    occupation: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: '',
  };
  @Output() changed = new EventEmitter<FormGroup>();
  formGroup: FormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
    private stepWizardService: StepWizardService,
  ) {
    this.formGroup = formBuilder.group({
      basicInfo: formBuilder.group({
        name: [null, [Validators.required]],
        occupation: [null, [Validators.required]],
        email: [null],
        phoneNumber: [null],
        location: [null, [Validators.required]],
        bio: [null, [Validators.required]],
      }),
    });

    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.changed.emit(value);
        const { basicInfo } = value;
        this.stepWizardService.updateResumeData('basicInfo', basicInfo);
      });
  }

  toggleSaving() {
    this.stepWizardService.triggerSave(true);
  }

  ngOnInit() {
    // for(const basicInfoData of Object.keys(this.basicInfo)) {
    //   if(!this.basicInfo) {
    //     this.formGroup.controls['basicInfo'] = this.formBuilder.group({
    //       [basicInfoData]: this.basicInfo[basicInfoData]
    //     })
    //   }
    // }
    if (this.basicInfo) {
      this.assignExistingBasicInfoToForm(this.basicInfo);
    }

    this.loadBasicInfoData();
  }

  loadBasicInfoData() {
    this.stepWizardService.resumeData$.subscribe((data) => {
      for (const key of Object.keys(data.basicInfo)) {
        if (!!data.basicInfo[key]) {
          this.formGroup.controls['basicInfo'].get(key)?.setValue(data.basicInfo[key]);
        }
      }
    });
  }

  onUpload(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Basic Mode',
    });
  }

  private assignExistingBasicInfoToForm(basicInfoData: BasicInfo) {
    this.formGroup.controls['basicInfo'].patchValue(basicInfoData);
  }
}
