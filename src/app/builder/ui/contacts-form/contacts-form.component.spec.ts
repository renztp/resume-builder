import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ContactsFormComponent } from './contacts-form.component';
import { StepWizardService } from '@shared/data-access/step-wizard.service';
import { Socials } from '@shared/models/socials';

describe('Contacts Form', () => {
  let comp: ContactsFormComponent;
  let fixture: ComponentFixture<ContactsFormComponent>;
  let mockStepWizardService: StepWizardService = jasmine.createSpyObj('StepWizardService', [
    'updateResumeData',
  ]);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContactsFormComponent],
      providers: [StepWizardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsFormComponent);
    comp = fixture.componentInstance;
    mockStepWizardService = TestBed.inject(StepWizardService);
    fixture.detectChanges();
  });

  it('should setup the form group with empty contacts', () => {
    expect(comp.contacts.controls.length).toBe(0);
  });

  it('should react to new selected contacts', () => {
    const mockContactItems: Socials[] = [
      {
        name: 'github',
        value: '',
        disabled: false,
      },
      {
        name: 'linkedin',
        value: '',
        disabled: false,
      },
    ];

    comp.contactItems = mockContactItems;

    spyOn(comp, 'processContacts').and.callThrough();
    comp.ngOnChanges({ contactItems: {} as any });
    expect(comp.contacts.controls.length).toBe(2);
    expect(comp.processContacts).toHaveBeenCalledTimes(1);
  });
});
