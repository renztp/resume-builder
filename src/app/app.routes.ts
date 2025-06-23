import { Routes } from '@angular/router';
import { BuilderPageComponent } from './builder/feature/builder-page/builder-page.component';
import { LayoutChooserPageComponent } from './layout-chooser/feature/layout-chooser.page';
import { SetupPageComponent } from './setup/setup.page.component';
import { AuthRegisterPage } from './auth/feature/auth-register/auth-register-page.component';
import { AuthLoginPage } from './auth/feature/auth-login/auth-login-page.component';
import { HomePageComponent } from './dashboard/feature/home-page/home-page.component';
import { SettingsPageComponent } from './dashboard/feature/settings-page/settings-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasicInfoFormComponent } from './builder/feature/basic-info-form/basic-info-form.component';
import { ContactInfoFormComponent } from './builder/feature/contact-info-form/contact-info-form.component';
import { WorkExperienceFormComponent } from './builder/feature/work-experience-form/work-experience-form.component';

export const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'register', component: AuthRegisterPage },
  { path: 'login', component: AuthLoginPage },
  { path: 'layout-chooser', component: LayoutChooserPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
      },
      {
        path: 'settings',
        component: SettingsPageComponent,
      },
    ],
  },
  {
    path: 'resume/:id',
    component: BuilderPageComponent,
    children: [
      {
        path: 'basic-info',
        component: BasicInfoFormComponent,
      },
      {
        path: 'contacts-info',
        component: ContactInfoFormComponent,
      },
      {
        path: 'work-experience',
        component: WorkExperienceFormComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
