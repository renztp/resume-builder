import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-setup.page',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule, RouterLink],
  templateUrl: './setup.page.component.html',
  styleUrl: './setup.page.component.scss'
})
export class SetupPageComponent {
  jsonModalVisibility: boolean = false;

  showDialog() {
    this.jsonModalVisibility = true;
  }
}
