import { ContactInfoFormComponent } from './contact-info-form.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StepWizardService } from '../../../shared/data-access/step-wizard.service';
import { DialogClosePayload } from '../../ui/socials-selector/socials-selector.component';
import { Socials } from '@shared/models/socials';

describe('Contact Info Form Component', () => {
  let comp: ContactInfoFormComponent;
  let fixture: ComponentFixture<ContactInfoFormComponent>;
  let mockStepWizardService: StepWizardService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContactInfoFormComponent],
      providers: [StepWizardService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoFormComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    mockStepWizardService = TestBed.inject(StepWizardService);
  });

  it('should fill active contacts after selecting contacts from contact-selector', () => {
    let mockDialogClosePayload: DialogClosePayload = {
      dialogVisibility: false,
      selectedNodes: [
        {
          label: 'github',
          data: { value: '' },
        },
        {
          label: 'linkedin',
          data: { value: 'http://linked.com/renztp' },
        },
      ],
    };

    comp.handleOnCloseDialog(mockDialogClosePayload);
    expect(comp.formContacts.length).toBe(2);
    expect(comp.contacts.length).toBe(2);
  });

  it('should disable the correct contact after deselecting from contact-selector', () => {
    let mockContacts: Socials[] = [
      {
        name: 'github',
        value: 'http://github.com/renztp',
        disabled: false,
      },
      {
        name: 'linkedin',
        value: '',
        disabled: false,
      },
    ];

    let mockDialogClosePayload: DialogClosePayload = {
      dialogVisibility: false,
      selectedNodes: [
        {
          label: 'linkedin',
          data: { value: 'http://linked.com/renztp' },
        },
      ],
    };
    comp.contacts = mockContacts;
    comp.handleOnCloseDialog(mockDialogClosePayload);
    expect(comp.contacts[0].disabled).toBeTruthy();
    expect(comp.contacts.length).toBe(2);
  });

  it('should add/reactivate a contact after selecting from contact-selector', () => {
    let mockContacts: Socials[] = [
      {
        name: 'facebook',
        value: '',
        disabled: false,
      },
      {
        name: 'youtube',
        value: '',
        disabled: true,
      },
      {
        name: 'linkedin',
        value: '',
        disabled: false,
      },
    ];

    let mockDialogClosePayload: DialogClosePayload = {
      dialogVisibility: false,
      selectedNodes: [
        {
          label: 'facebook',
          data: { value: '' },
        },
        {
          label: 'youtube',
        },
        {
          label: 'linkedin',
          data: { value: '' },
        },
        {
          label: 'github',
          data: { value: '' },
        },
      ],
    };

    comp.contacts = mockContacts;
    spyOn(comp, 'enableCurrentContacts');
    comp.handleOnCloseDialog(mockDialogClosePayload);
    expect(comp.contacts.length).toBe(4);
    console.log(comp.contacts);
    // TODO: there seems to be a bug on this, i think its not enabling the contact from `this.contacts`
    expect(comp.contacts[1].disabled).toBeFalsy();
    // expect(comp.contacts[3].disabled).toBeFalsy();
    expect(comp.enableCurrentContacts).toHaveBeenCalled();
  });
});
