import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// Define data structure that we want to show.
export interface Hermano {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  cuotaAlDia: boolean;
}

// Create some examples for testing (Mock Data).
const HERMANOS_DATA: Hermano[] = [
  { id: 1, nombre: 'Antonio', apellidos: 'Pérez García', fechaAlta: '2015-03-12', cuotaAlDia: true },
  { id: 2, nombre: 'María', apellidos: 'Gómez López', fechaAlta: '2018-05-24', cuotaAlDia: false },
  { id: 3, nombre: 'Carlos', apellidos: 'Ruiz Navarro', fechaAlta: '2020-01-10', cuotaAlDia: true },
  { id: 4, nombre: 'Laura', apellidos: 'Martínez Silva', fechaAlta: '2022-11-05', cuotaAlDia: true },
];

@Component({
  selector: 'app-censo',
  imports: [MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './censo.html',
  styleUrl: './censo.scss',
})
export class Censo {
  // Display columns and order.
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaAlta', 'estado'];

  // Transform simple data in a DataSource of Material.
  dataSource = new MatTableDataSource(HERMANOS_DATA);

  // Function executed when looking something in the filter bar.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
