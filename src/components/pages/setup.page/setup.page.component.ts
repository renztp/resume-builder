import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-setup.page',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './setup.page.component.html',
  styleUrl: './setup.page.component.scss'
})
export class SetupPageComponent {

}
