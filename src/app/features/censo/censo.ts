import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { HermanoForm } from './hermano-form/hermano-form';
import { CensoService } from '../../core/services/api/censoService';
import { MatButtonModule } from '@angular/material/button';

export interface Hermano {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  cuotaAlDia: boolean;
}

@Component({
  selector: 'app-censo',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: './censo.html',
  styleUrl: './censo.scss',
})
export class Censo implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellidos', 'fechaAlta', 'estado', 'acciones'];

  // Initialize with an empty array. The backend will fill it.
  dataSource = new MatTableDataSource<Hermano>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Dependency Injections
  private censoService = inject(CensoService);
  private dialog = inject(MatDialog);

  // Executed exactly when the component is created
  ngOnInit(): void {
    this.loadHermanos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Hermano, filter: string) => {
      const textoFila = (data.nombre + ' ' + data.apellidos).toLowerCase();
      return textoFila.includes(filter);
    };
  }

  /**
   * Fetches data from the backend and updates the table.
   */
  loadHermanos(): void {
    this.censoService.getAllHermanos().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Inject real backend data into the table
      },
      error: (err) => {
        console.error('Error loading members from backend:', err);
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

  /**
   * Opens the dialog to add a new member.
   */
  openAddDialog(): void {
    const dialogRef = this.dialog.open(HermanoForm, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        // If the form was saved correctly, we ask the backend for the updated list
        this.loadHermanos();
      }
    });
  }

  /**
   * Deletes a member after asking for confirmation, then reloads the table.
   * @param id The ID of the member to delete.
   */
  deleteHermano(id: number): void {
    // A simple native browser confirmation dialog
    if (confirm('Are you sure you want to delete this member?')) {
      this.censoService.deleteHermano(id).subscribe({
        next: () => {
          console.log(`Member with ID ${id} deleted successfully.`);
          this.loadHermanos(); // Reload the table instantly
        },
        error: (err) => {
          console.error('Error deleting member:', err);
        },
      });
    }
  }
}
