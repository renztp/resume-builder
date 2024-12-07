import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from "@angular/core";
import { ResumeData } from "../../models/resume-data";
import {
  FormArray,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { WorkExperience } from "../../models/work-experience";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { AccordionModule, AccordionTabOpenEvent } from "primeng/accordion";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-work-experience-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    EditorModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    AccordionModule,
    CalendarModule,
    CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: "./work-experience-form.component.html",
  styleUrl: "./work-experience-form.component.scss",
})
export class WorkExperienceFormComponent {
  @Input() workExperience: WorkExperience[] = [];
  @Output() changed = new EventEmitter<FormGroup>();
  activeIndex: number[] = [];
  formGroup: FormGroup;
  loading = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService,
  ) {
    this.formGroup = this.formBuilder.group({
      workExperiences: this.formBuilder.array([]),
    });

    this.formGroup.valueChanges
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((value) => this.changed.emit(value));
  }

  ngOnInit() {
    this.loading = true;
    if (this.workExperience.length > 0) {
      this.assignExistingWorkExperience(this.workExperience);
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    console.log('destroying!!');
  }

  private assignExistingWorkExperience(workExperience: WorkExperience[]) {
    const workExperienceArray = this.formGroup.get(
      "workExperiences",
    ) as FormArray;
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
      logo: [null],
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
      logo: [null],
    });

    this.workExperiences.push(workExperience);
  }

  get workExperiences() {
    return this.formGroup.controls["workExperiences"] as FormArray;
  }

  removeWorkExperience(index: number) {
    this.workExperiences.removeAt(index);
  }

  onUpload(event: any) {
    this.messageService.add({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded with Basic Mode",
    });
  }

  addOrRemoveActiveIndex(activeIndex: number) {
    const index = this.activeIndex.indexOf(activeIndex);
    if(index > -1) {
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
    const present = workExperience.get("present");
    const endYear = workExperience.get("endYear");
    present?.value?.length > 0 ? endYear?.disable() : endYear?.enable();
  }
}
