import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ResumeData } from '~/app/shared/models/resume-data';
import { SelectModule } from 'primeng/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-resumes',
  imports: [CommonModule, SelectModule, ReactiveFormsModule, RouterLink],
  templateUrl: './resumes.component.html',
  styleUrl: './resumes.component.scss',
  standalone: true,
})
export class ResumesComponent implements OnInit {
  cities: City[] | undefined;
  formGroup!: FormGroup;
  resumes: ResumeData[] = [
    {
      id: '0',
      resumeName: 'Resume Test 1',
    },
    {
      id: '1',
      resumeName: 'Resume Test 2',
    },
    {
      id: '2',
      resumeName: 'Resume Test 3',
    },
    {
      id: '3',
      resumeName: 'Resume Test 4',
    },
    {
      id: '4',
      resumeName: 'Resume Test 5',
    },
  ];
  constructor() {}

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];

    this.formGroup = new FormGroup({
      selectedCity: new FormControl<City | null>(null),
    });

    this.formGroup.controls['selectedCity'].valueChanges.subscribe((v) => console.log(v));
  }

  private loadResumes() {}
}
