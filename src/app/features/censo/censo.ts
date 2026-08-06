import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

// 1. Define data structure that we want to show.
export interface Hermano {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  cuotaAlDia: boolean;
}

// 2. Create some examples for testing (Mock Data).
const HERMANOS_DATA: Hermano[] = [
  { id: 1, nombre: 'Antonio', apellidos: 'Pérez García', fechaAlta: '2015-03-12', cuotaAlDia: true },
  { id: 2, nombre: 'María', apellidos: 'Gómez López', fechaAlta: '2018-05-24', cuotaAlDia: false },
  { id: 3, nombre: 'Carlos', apellidos: 'Ruiz Navarro', fechaAlta: '2020-01-10', cuotaAlDia: true },
  { id: 4, nombre: 'Laura', apellidos: 'Martínez Silva', fechaAlta: '2022-11-05', cuotaAlDia: true },
];

@Component({
  selector: 'app-censo',
  imports: [MatTableModule],
  templateUrl: './censo.html',
  styleUrl: './censo.scss',
})

export class Censo {
  // 3. Display columns and order.
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaAlta', 'estado'];

  // 4. Send data.
  dataSource = HERMANOS_DATA;
}
