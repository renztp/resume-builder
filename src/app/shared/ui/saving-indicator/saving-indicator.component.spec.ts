import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingIndicatorComponent } from './saving-indicator.component';

describe('SavingIndicatorComponent', () => {
  let component: SavingIndicatorComponent;
  let fixture: ComponentFixture<SavingIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavingIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SavingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
