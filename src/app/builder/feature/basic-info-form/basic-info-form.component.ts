import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {ImageModule} from 'primeng/image'
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BasicInfo } from '../../../shared/models/basic';
import { CommonModule } from '@angular/common';
import { SocialsSelectorComponent } from '../../ui/socials-selector/socials-selector.component';


@Component({
  selector: 'app-basic-info-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, EditorModule, FileUploadModule, ToastModule, ButtonModule, CommonModule, ImageModule, SocialsSelectorComponent],
  providers: [MessageService, HttpClient],
  templateUrl: './basic-info-form.component.html',
  styleUrl: './basic-info-form.component.scss'
})
export class BasicInfoFormComponent {
  @Input() basicInfo: BasicInfo = {
    name: '',
    occupation: '',
    email: '',
    phoneNumber: '',
    location: '',
    bio: ''
  };
  @Output() next = new EventEmitter<void>();
  @Output() changed = new EventEmitter<FormGroup>();
  formGroup: FormGroup;

  constructor(formBuilder: UntypedFormBuilder, private messageService: MessageService) {
    this.formGroup = formBuilder.group({
      basicInfo: formBuilder.group({
        name: [null, [Validators.required]],
        occupation: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        phoneNumber: [null, [Validators.required]],
        location: [null, [Validators.required]],
        bio: [null, [Validators.required]],
      })
    })


    this.formGroup.valueChanges.pipe(debounceTime(500)).pipe(distinctUntilChanged()).subscribe(value => this.changed.emit(value));
  }

  ngOnInit() {
    if(this.basicInfo) {
      this.assignExistingBasicInfoToForm(this.basicInfo);
    }
  }

  onUpload(event: any) {
      this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

  private assignExistingBasicInfoToForm(basicInfoData: BasicInfo) {
    this.formGroup.controls['basicInfo'].patchValue(basicInfoData);
  }
}
