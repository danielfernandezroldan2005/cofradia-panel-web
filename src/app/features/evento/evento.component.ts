import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EventoFormComponent } from './evento-form/evento-form.component';
import { EventoService } from '../../core/services/api/evento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;
}

@Component({
  selector: 'app-evento',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIcon,
  ],
  templateUrl: './evento.component.html',
  styleUrl: './evento.component.scss',
})
export class EventoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'fecha', 'descripcion', 'ubicacion', 'acciones'];

  // Initialize with an empty array. The backend will fill it.
  dataSource = new MatTableDataSource<Evento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Dependency Injections
  private eventoService = inject(EventoService);
  private dialog = inject(MatDialog);

  // Executed exactly when the component is created
  ngOnInit(): void {
    this.loadEventos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Evento, filter: string) => {
      const textoFila = (data.titulo + ' ' + data.descripcion + ' ' + data.ubicacion).toLowerCase();
      return textoFila.includes(filter);
    };
  }

  /**
   * Fetches data from the backend and updates the table.
   */
  loadEventos(): void {
    this.eventoService.getAllEventos().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Inject real backend data into the table
      },
      error: (err) => {
        console.error('Error loading events from backend:', err);
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
   * Opens the dialog to add a new event.
   */
  openAddDialog(): void {
    const dialogRef = this.dialog.open(EventoFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        // If the form was saved correctly, we ask the backend for the updated list
        this.loadEventos();
      }
    });
  }

  /**
   * Deletes an event after asking for confirmation, then reloads the table.
   * @param id The ID of the event to delete.
   */
  deleteEvento(id: number): void {
    // A simple native browser confirmation dialog
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventoService.deleteEvento(id).subscribe({
        next: () => {
          console.log(`Event with ID ${id} deleted successfully.`);
          this.loadEventos(); // Reload the table instantly
        },
        error: (err) => {
          console.error('Error deleting event:', err);
        },
      });
    }
  }

  /**
   * Opens the dialog to edit an existing event.
   * Passes the selected event's data to the dialog.
   */
  openEditDialog(evento: Evento): void {
    const dialogRef = this.dialog.open(EventoFormComponent, {
      width: '400px',
      disableClose: true,
      data: evento, // Send Data to Modal.
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadEventos();
      }
    });
  }
}
