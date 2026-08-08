import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AuditoriaFormComponent } from './auditoria-form/auditoria-form.component';
import { AuditoriaService } from '../../core/services/api/auditoria.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Auditoria {
  id: number;
  entidadAfectada: string;
  operacion: string;
  fechaOperacion: string;
  usuario: string;
}

@Component({
  selector: 'app-auditoria',
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
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss',
})
export class AuditoriaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'entidadAfectada', 'operacion', 'fechaOperacion', 'usuario', 'acciones'];

  dataSource = new MatTableDataSource<Auditoria>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private auditoriaService = inject(AuditoriaService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadAuditorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Auditoria, filter: string) => {
      const textToFilter = (data.entidadAfectada + ' ' + data.operacion + ' ' + data.usuario).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadAuditorias(): void {
    this.auditoriaService.getAllAuditorias().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading audit logs from backend:', err);
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
    const dialogRef = this.dialog.open(AuditoriaFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadAuditorias();
      }
    });
  }

  deleteAuditoria(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar este registro de auditoría?')) {
      this.auditoriaService.deleteAuditoria(id).subscribe({
        next: () => {
          console.log(`Audit log with ID ${id} deleted successfully.`);
          this.loadAuditorias();
        },
        error: (err) => {
          console.error('Error deleting audit log:', err);
        },
      });
    }
  }

  openEditDialog(auditoria: Auditoria): void {
    const dialogRef = this.dialog.open(AuditoriaFormComponent, {
      width: '400px',
      disableClose: true,
      data: auditoria,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadAuditorias();
      }
    });
  }
}
