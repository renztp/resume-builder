import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPreviewerComponent } from './layout-previewer.component';

describe('LayoutPreviewerComponent', () => {
  let component: LayoutPreviewerComponent;
  let fixture: ComponentFixture<LayoutPreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutPreviewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutPreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
