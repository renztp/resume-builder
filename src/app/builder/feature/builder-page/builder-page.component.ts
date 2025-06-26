import { Component } from '@angular/core';
import { BuilderNavbarComponent } from '../../ui/builder-navbar/builder-navbar.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BuilderActionBarComponent } from '../../ui/builder-action-bar/builder-action-bar.component';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrl: './builder-page.component.scss',
  imports: [BuilderNavbarComponent, RouterOutlet, RouterLink, BuilderActionBarComponent],
  standalone: true,
})
export class BuilderPageComponent {
  constructor() {}
}
