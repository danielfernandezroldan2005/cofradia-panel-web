import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CensoComponent } from './features/censo/censo.component';
import { EventoComponent } from './features/evento/evento.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { CuotaComponent } from './features/cuota/cuota.component';
import { PapeletaComponent } from './features/papeleta/papeleta.component';
import { DocumentoComponent } from './features/documento/documento.component';
import { AuditoriaComponent } from './features/auditoria/auditoria.component';
import { BiografiaComponent } from './features/biografia/biografia.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent }, // Added DashboardComponent's route here.
  { path: 'censo', component: CensoComponent }, // Added CensoComponent's route here.
  { path: 'eventos', component: EventoComponent }, // Added Evento's route here.
  { path: 'inventario', component: InventoryComponent }, // Added Inventory's route here.
  { path: 'cuotas', component: CuotaComponent }, // Added Cuota's route here.
  { path: 'papeletas', component: PapeletaComponent }, // Added Papeleta's route here.
  { path: 'documentos', component: DocumentoComponent }, // Added Documento's route here.
  { path: 'auditoria', component: AuditoriaComponent }, // Added Auditoria's route here.
  { path: 'biografia', component: BiografiaComponent }, // Added Biografia's route here.
  { path: '**', redirectTo: '' },
];
