import { Routes } from '@angular/router';
import { SetupPageComponent } from '../components/pages/setup.page/setup.page.component';
import { AppComponent } from './app.component';
import { BuilderPageComponent } from '../components/pages/builder.page/builder.page.component';

export const routes: Routes = [
  { path: '', component: SetupPageComponent },
  { path: 'builder', component: BuilderPageComponent },
];
