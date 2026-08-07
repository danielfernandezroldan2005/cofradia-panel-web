import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

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
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, MatPaginatorModule],
  templateUrl: './censo.html',
  styleUrl: './censo.scss',
})
export class Censo implements AfterViewInit {
  // Display columns and order.
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaAlta', 'estado'];

  // Transform simple data in a DataSource of Material.
  dataSource = new MatTableDataSource(HERMANOS_DATA);

  // Capture HTML paginator.
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // When view is charged, we vinculate the paginator to the table.
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // We create a Personalized Filter by first and last names.
    this.dataSource.filterPredicate = (data: Hermano, filter: string) => {
      // Join first and last names in a string in lower case.
      const textoFila = (data.nombre + ' ' + data.apellidos).toLowerCase();
      // Check user string and compare with our data.
      return textoFila.includes(filter);
    };
  }

  // Function executed when looking something in the filter bar.
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // If we are looking for something, we return the paginator to the first page.
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
