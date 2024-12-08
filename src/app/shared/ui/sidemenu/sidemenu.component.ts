import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu'

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: "Main",
        items: [
          {
            label: "Basic Information",
          },
          {
            label: "Work Experience",
            command: () => {
            }
          },
          {
            label: "Education"
          }
        ]
      },
      {
        label: "Misc",
        items: [
          {
            label: "Skills"
          },
          {
            label: "Interests"
          }
        ]
      }
    ]
  }
}
