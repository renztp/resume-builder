import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutChooserPageComponent } from './layout-chooser.page.component';

describe('LayoutChooserPageComponent', () => {
  let component: LayoutChooserPageComponent;
  let fixture: ComponentFixture<LayoutChooserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutChooserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutChooserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
