import { Component, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-layout-chooser.page',
  standalone: true,
  imports: [RadioButtonModule, FormsModule, ButtonModule, RouterLink],
  templateUrl: './layout-chooser.page.html',
  styleUrl: './layout-chooser.page.scss'
})
export class LayoutChooserPageComponent {
  layout!: string;

  constructor(private router: Router) {

  }

  changeSelectedLayout(layout: string) {
    this.layout = layout;
    console.log('layout', this.layout);
  }

  navigateBuilder() {
    this.router.navigate(['/builder', { layout: this.layout }])
  }
}
