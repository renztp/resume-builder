import { Routes } from '@angular/router';
import { BuilderPageComponent } from './builder/feature/builder-page/builder.page';
import { LayoutChooserPageComponent } from './layout-chooser/feature/layout-chooser.page';
import { SetupPageComponent } from './setup/setup.page.component';

export const routes: Routes = [
  { path: '', component: SetupPageComponent },
  // { path: '', component: LayoutChooserPageComponent },
  { path: 'layout-chooser', component: LayoutChooserPageComponent },
  // { path: '', component: UploaderPageComponent },
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
