import { Routes } from '@angular/router';
import { BuilderPageComponent } from './builder/feature/builder-page/builder.page';
import { LayoutChooserPageComponent } from './layout-chooser/feature/layout-chooser.page';
import { SetupPageComponent } from './setup/setup.page.component';
import { AuthRegisterPage } from './auth/feature/auth-register/auth-register-page.component';
import { AuthLoginPage } from './auth/feature/auth-login/auth-login-page.component';

export const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'register', component: AuthRegisterPage },
  { path: 'login', component: AuthLoginPage },
  { path: 'layout-chooser', component: LayoutChooserPageComponent },
  {
    path: 'builder',
    component: BuilderPageComponent,
    // children: [
    //   {
    //     path: 'basic-info',
    //     component: BasicInfoFormComponent
    //   }
    // ]
  },
  { path: '**', redirectTo: '' },
];
