import { Routes } from '@angular/router';
import { SetupPageComponent } from '../components/pages/setup.page/setup.page.component';
import { AppComponent } from './app.component';
import { BuilderPageComponent } from '../components/pages/builder.page/builder.page.component';
import { LayoutChooserPageComponent } from '../components/pages/layout-chooser.page/layout-chooser.page.component';
import { BasicInfoFormComponent } from '../components/basic-info-form/basic-info-form.component';

export const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { 
    path: 'builder', component: BuilderPageComponent,
    children: [
      {
        path: 'basic-info',
        component: BasicInfoFormComponent
      }
    ]
  },
  { path: 'layout-chooser', component: LayoutChooserPageComponent },
  { path: '**', redirectTo: '' }
];
