import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Censo } from './features/censo/censo';

export const routes: Routes = [
  { path: '', component: Dashboard }, // Added Dashboard's route here.
  { path: 'censo', component: Censo }, // Added Censo's route here.
  { path: '**', redirectTo: '' },
];
