import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidemenu',
  imports: [MenuModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  standalone: true,
})
export class SidemenuComponent {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Main',
        items: [
          {
            label: 'Basic Information',
          },
          {
            label: 'Contact Information',
          },
          {
            label: 'Work Experience',
            command: () => {},
          },
          {
            label: 'Education',
          },
        ],
      },
      // {
      //   label: "Misc",
      //   items: [
      //     {
      //       label: "Skills"
      //     },
      //     {
      //       label: "Interests"
      //     }
      //   ]
      // }
    ];
  }
}
