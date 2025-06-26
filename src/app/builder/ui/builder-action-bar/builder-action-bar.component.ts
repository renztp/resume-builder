import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-builder-action-bar',
  imports: [ButtonModule],
  templateUrl: './builder-action-bar.component.html',
  styleUrl: './builder-action-bar.component.scss',
  standalone: true,
})
export class BuilderActionBarComponent {
  constructor() {}
}
