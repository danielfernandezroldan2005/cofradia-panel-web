import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DocumentoFormComponent } from './documento-form/documento-form.component';
import { DocumentoService } from '../../core/services/api/documento.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Documento {
  id: number;
  titulo: string;
  tipo: string;
  fechaCreacion: string;
  enlaceArchivo: string;
}

@Component({
  selector: 'app-documento',
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
  templateUrl: './documento.component.html',
  styleUrl: './documento.component.scss',
})
export class DocumentoComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'titulo', 'tipo', 'fechaCreacion', 'enlaceArchivo', 'acciones'];

  dataSource = new MatTableDataSource<Documento>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private documentoService = inject(DocumentoService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadDocumentos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Documento, filter: string) => {
      const textToFilter = (data.titulo + ' ' + data.tipo + ' ' + data.enlaceArchivo).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadDocumentos(): void {
    this.documentoService.getAllDocumentos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading documents from backend:', err);
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
    const dialogRef = this.dialog.open(DocumentoFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadDocumentos();
      }
    });
  }

  deleteDocumento(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este documento?')) {
      this.documentoService.deleteDocumento(id).subscribe({
        next: () => {
          console.log(`Document with ID ${id} deleted successfully.`);
          this.loadDocumentos();
        },
        error: (err) => {
          console.error('Error deleting document:', err);
        },
      });
    }
  }

  openEditDialog(documento: Documento): void {
    const dialogRef = this.dialog.open(DocumentoFormComponent, {
      width: '400px',
      disableClose: true,
      data: documento,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadDocumentos();
      }
    });
  }
}
