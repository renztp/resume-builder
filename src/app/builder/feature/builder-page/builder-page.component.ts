import { Component } from '@angular/core';
import { BuilderNavbarComponent } from '../../ui/builder-navbar/builder-navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrl: './builder-page.component.scss',
  imports: [BuilderNavbarComponent, RouterOutlet, RouterLink],
  standalone: true,
})
export class BuilderPageComponent {
  constructor() {}
}
