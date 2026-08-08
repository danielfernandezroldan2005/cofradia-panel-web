import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CuotaFormComponent } from './cuota-form/cuota-form.component';
import { CuotaService } from '../../core/services/api/cuota.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Cuota {
  id: number;
  idHermano: number;
  importe: number;
  fechaPago: string;
  estado: string;
}

@Component({
  selector: 'app-cuota',
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
  templateUrl: './cuota.component.html',
  styleUrl: './cuota.component.scss',
})
export class CuotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'idHermano', 'importe', 'fechaPago', 'estado', 'acciones'];

  dataSource = new MatTableDataSource<Cuota>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private cuotaService = inject(CuotaService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCuotas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Cuota, filter: string) => {
      const textToFilter = (data.estado + ' ' + data.idHermano + ' ' + data.importe).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadCuotas(): void {
    this.cuotaService.getAllCuotas().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading fees from backend:', err);
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
    const dialogRef = this.dialog.open(CuotaFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadCuotas();
      }
    });
  }

  deleteCuota(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta cuota?')) {
      this.cuotaService.deleteCuota(id).subscribe({
        next: () => {
          console.log(`Fee with ID ${id} deleted successfully.`);
          this.loadCuotas();
        },
        error: (err) => {
          console.error('Error deleting fee:', err);
        },
      });
    }
  }

  openEditDialog(cuota: Cuota): void {
    const dialogRef = this.dialog.open(CuotaFormComponent, {
      width: '400px',
      disableClose: true,
      data: cuota,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadCuotas();
      }
    });
  }
}
