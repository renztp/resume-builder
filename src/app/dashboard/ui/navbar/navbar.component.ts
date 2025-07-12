import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '~/app/auth/data-access/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}
