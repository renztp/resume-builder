import { Component } from '@angular/core';
import { ResumeData } from '~/app/shared/models/resume-data';

@Component({
  selector: 'app-resumes',
  imports: [],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.scss',
  standalone: true,
})
export class ResumesComponent {
  resumes!: ResumeData[];
  constructor() {}

  private loadResumes() {}
}
