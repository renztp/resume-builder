import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResumeData } from '~/app/shared/models/resume-data';

@Component({
  selector: 'app-resumes',
  imports: [CommonModule],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.scss',
  standalone: true,
})
export class ResumesComponent {
  resumes: ResumeData[] = [
    {
      resumeName: 'Resume Test 1',
    },
    {
      resumeName: 'Resume Test 2',
    },
    {
      resumeName: 'Resume Test 3',
    },
    {
      resumeName: 'Resume Test 4',
    },
    {
      resumeName: 'Resume Test 5',
    },
  ];
  constructor() {}

  private loadResumes() {}
}
