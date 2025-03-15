import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepWizardFooterComponent } from './step-wizard-footer.component';

describe('StepWizardFooterComponent', () => {
  let component: StepWizardFooterComponent;
  let fixture: ComponentFixture<StepWizardFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepWizardFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepWizardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
