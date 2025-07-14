import { Component } from '@angular/core';
import { BuilderNavbarComponent } from '../../ui/builder-navbar/builder-navbar.component';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BuilderActionBarComponent } from '../../ui/builder-action-bar/builder-action-bar.component';
import { filter } from 'rxjs/operators';
import { StepWizardService } from '../../../shared/data-access/step-wizard.service';
import { SavingIndicatorComponent } from '../../ui/saving-indicator/saving-indicator.component';
import { ResumeData } from '../../../shared/models/resume-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrl: './builder-page.component.scss',
  imports: [
    BuilderNavbarComponent,
    RouterOutlet,
    RouterLink,
    BuilderActionBarComponent,
    SavingIndicatorComponent,
    CommonModule,
  ],
  standalone: true,
})
export class BuilderPageComponent {
  steps: string[] = [];
  savingState: boolean = false;
  currentIndex = 0;
  resumeData!: ResumeData;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stepWizardService: StepWizardService,
  ) {}

  ngOnInit() {
    const childRoutes = this.route.routeConfig?.children || [];
    console.log({ childRoutes });

    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const currentChildPath = this.route.firstChild?.snapshot.routeConfig?.path || '';
      this.currentIndex = this.steps.indexOf(currentChildPath);
    });

    this.stepWizardService.resumeData$.subscribe((data) => {
      this.resumeData = data;
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
