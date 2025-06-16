import { Component } from '@angular/core';
import { ResumesComponent } from '../resumes/resumes.component';

@Component({
  selector: 'app-home-page',
  imports: [ResumesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true,
})
export class HomePageComponent {
  constructor() {}
}
