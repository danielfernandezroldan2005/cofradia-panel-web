import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Censo } from './features/censo/censo';
import { EventoComponent } from './features/evento/evento.component';

export const routes: Routes = [
  { path: '', component: Dashboard }, // Added Dashboard's route here.
  { path: 'censo', component: Censo }, // Added Censo's route here.
  { path: 'eventos', component: EventoComponent }, // Added Evento's route here.
  { path: '**', redirectTo: '' },
];
