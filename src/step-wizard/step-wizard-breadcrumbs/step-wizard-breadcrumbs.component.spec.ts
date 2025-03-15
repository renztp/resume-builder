import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepWizardBreadcrumbsComponent } from './step-wizard-breadcrumbs.component';

describe('StepWizardBreadcrumbsComponent', () => {
  let component: StepWizardBreadcrumbsComponent;
  let fixture: ComponentFixture<StepWizardBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepWizardBreadcrumbsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepWizardBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
