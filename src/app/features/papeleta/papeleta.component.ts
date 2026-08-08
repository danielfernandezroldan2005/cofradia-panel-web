import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PapeletaFormComponent } from './papeleta-form/papeleta-form.component';
import { PapeletaService } from '../../core/services/api/papeleta.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Papeleta {
  id: number;
  idHermano: number;
  puesto: string;
  anio: number;
  estado: string;
}

@Component({
  selector: 'app-papeleta',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './papeleta.component.html',
  styleUrl: './papeleta.component.scss',
})
export class PapeletaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'idHermano', 'puesto', 'anio', 'estado', 'acciones'];

  dataSource = new MatTableDataSource<Papeleta>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private papeletaService = inject(PapeletaService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadPapeletas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Papeleta, filter: string) => {
      const textToFilter = (data.puesto + ' ' + data.estado + ' ' + data.idHermano + ' ' + data.anio).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadPapeletas(): void {
    this.papeletaService.getAllPapeletas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading assignments from backend:', err);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PapeletaFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadPapeletas();
      }
    });
  }

  deletePapeleta(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta papeleta de sitio?')) {
      this.papeletaService.deletePapeleta(id).subscribe({
        next: () => {
          console.log(`Assignment with ID ${id} deleted successfully.`);
          this.loadPapeletas();
        },
        error: (err) => {
          console.error('Error deleting assignment:', err);
        },
      });
    }
  }

  openEditDialog(papeleta: Papeleta): void {
    const dialogRef = this.dialog.open(PapeletaFormComponent, {
      width: '400px',
      disableClose: true,
      data: papeleta,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadPapeletas();
      }
    });
  }
}
