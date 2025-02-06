import { Routes } from '@angular/router';
import { BuilderPageComponent } from './builder/feature/builder-page/builder.page';
import { LayoutChooserPageComponent } from './layout-chooser/feature/layout-chooser.page';
import { PreviewPageComponent } from './builder/feature/preview-page/preview.page';
import { UploaderPageComponent } from './uploader/feature/uploader.page';

export const routes: Routes = [
  // { path: '', component: SetupPageComponent },
  { path: 'layout-chooser', component: LayoutChooserPageComponent },
  // { path: '', component: LayoutChooserPageComponent },
  { path: '', component: UploaderPageComponent },
  {
    path: 'builder', component: BuilderPageComponent,
    // children: [
    //   {
    //     path: 'basic-info',
    //     component: BasicInfoFormComponent
    //   }
    // ]
  },
  {
    path: 'preview',
    component: PreviewPageComponent
  },
  { path: '**', redirectTo: '' }
];
