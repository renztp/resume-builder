import { Component } from '@angular/core';
import { BuilderNavbarComponent } from '../../ui/builder-navbar/builder-navbar.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BuilderActionBarComponent } from '../../ui/builder-action-bar/builder-action-bar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrl: './builder-page.component.scss',
  imports: [BuilderNavbarComponent, RouterOutlet, RouterLink, BuilderActionBarComponent],
  standalone: true,
})
export class BuilderPageComponent {
  steps: string[] = [];
  currentIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const childRoutes = this.route.routeConfig?.children || [];
    console.log({ childRoutes });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const currentChildPath = this.route.firstChild?.snapshot.routeConfig?.path || '';
      this.currentIndex = this.steps.indexOf(currentChildPath);
    });
  }

  goToNext() {
    if (this.currentIndex < this.steps.length - 1) {
      const nextPath = this.steps[this.currentIndex + 1];
      this.router.navigate([nextPath], { relativeTo: this.route });
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      const prevPath = this.steps[this.currentIndex - 1];
      this.router.navigate([prevPath], { relativeTo: this.route });
    }
  }
}
