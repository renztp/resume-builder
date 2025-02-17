import { render, screen, fireEvent, aliasedInput } from '@testing-library/angular';
import { WorkExperienceFormComponent } from './work-experience-form.component';

describe('WorkExperienceFormComponent', () => {
  it('should render the work experience form', async () => {
    await render(WorkExperienceFormComponent, {
      inputs: {
        workExperience: [],
      }
    });

    expect(screen.getByText('Work Experience')).toBeTruthy();
  });
});
