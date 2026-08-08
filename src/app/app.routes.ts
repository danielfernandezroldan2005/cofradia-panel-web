import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CensoComponent } from './features/censo/censo.component';
import { EventoComponent } from './features/evento/evento.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { CuotaComponent } from './features/cuota/cuota.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // Added DashboardComponent's route here.
  { path: 'censo', component: CensoComponent }, // Added CensoComponent's route here.
  { path: 'eventos', component: EventoComponent }, // Added Evento's route here.
  { path: 'inventario', component: InventoryComponent }, // Added Inventory's route here.
  { path: 'cuotas', component: CuotaComponent }, // Added Cuota's route here.
  { path: '**', redirectTo: '' },
];
