import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderActionBarComponent } from './builder-action-bar.component';

describe('BuilderActionBarComponent', () => {
  let component: BuilderActionBarComponent;
  let fixture: ComponentFixture<BuilderActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuilderActionBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BuilderActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
