import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { BiografiaFormComponent } from './biografia-form/biografia-form.component';
import { BiografiaService } from '../../core/services/api/biografia.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Biografia {
  id: number;
  titulo: string;
  contenido: string;
  fechaHito: string;
  imagenUrl: string;
}

@Component({
  selector: 'app-biografia',
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
  templateUrl: './biografia.component.html',
  styleUrl: './biografia.component.scss',
})
export class BiografiaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'contenido', 'fechaHito', 'imagenUrl', 'acciones'];

  dataSource = new MatTableDataSource<Biografia>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private biografiaService = inject(BiografiaService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadBiografias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Biografia, filter: string) => {
      const textToFilter = (data.titulo + ' ' + data.contenido + ' ' + data.fechaHito).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadBiografias(): void {
    this.biografiaService.getAllBiografias().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading biography milestones from backend:', err);
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
    const dialogRef = this.dialog.open(BiografiaFormComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadBiografias();
      }
    });
  }

  deleteBiografia(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este hito histórico?')) {
      this.biografiaService.deleteBiografia(id).subscribe({
        next: () => {
          console.log(`Milestone with ID ${id} deleted successfully.`);
          this.loadBiografias();
        },
        error: (err) => {
          console.error('Error deleting milestone:', err);
        },
      });
    }
  }

  openEditDialog(biografia: Biografia): void {
    const dialogRef = this.dialog.open(BiografiaFormComponent, {
      width: '450px',
      disableClose: true,
      data: biografia,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadBiografias();
      }
    });
  }
}
