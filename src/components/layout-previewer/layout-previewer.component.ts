import { Component } from '@angular/core';
import { ResumeData } from '../../models/resume-data';

@Component({
  selector: 'app-layout-previewer',
  standalone: true,
  imports: [],
  templateUrl: './layout-previewer.component.html',
  styleUrl: './layout-previewer.component.scss'
})
export class LayoutPreviewerComponent {
  resumeData: ResumeData = {
    basicInfo: {
      name: "Renz Pulvira",
      bio: "I'm a software developer based in Pampanga, Philippines",
      email: "tullaorenz@gmail.com",
      picture: "test",
      location: "Pampanga, Philippines",
      occupation: "Software Developer",
      phoneNumber: "+639514464329"
    },
    workExperience: [
      {
        url: "https://www.promotions.com/",
        logo: "Test",
        startYear: "01/01/2021",
        endYear: "01/02/2021",
        occupation: "Software Developer",
        companyName: "Really cool company Inc.",
        description: `
          - Worked a lot of stuff there
          - Dranked a lot of coffee there
        `
      },
    ],
    education: [
      {
        schoolName: "Reall Cool School",
        degree: "Associate Degree",
        startYear: "01/01/2020",
        endYear: "01/02/2020",
        description: `
          - Did a lot of school
          - Read a lot of books
        `,
        logo: "Test",
      }
    ]
  }
}
