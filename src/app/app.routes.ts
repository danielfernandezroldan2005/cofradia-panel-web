import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CensoComponent } from './features/censo/censo.component';
import { EventoComponent } from './features/evento/evento.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // Added DashboardComponent's route here.
  { path: 'censo', component: CensoComponent }, // Added CensoComponent's route here.
  { path: 'eventos', component: EventoComponent }, // Added Evento's route here.
  { path: '**', redirectTo: '' },
];
