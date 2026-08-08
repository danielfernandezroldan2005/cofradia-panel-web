import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryService } from '../../core/services/api/inventory.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface Inventory {
  id: number;
  nombreArticulo: string;
  categoria: string;
  estadoConservacion: string;
  ubicacion: string;
}

@Component({
  selector: 'app-inventory',
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
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'nombreArticulo', 'categoria', 'estadoConservacion', 'ubicacion', 'acciones'];

  dataSource = new MatTableDataSource<Inventory>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private inventoryService = inject(InventoryService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadInventory();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Inventory, filter: string) => {
      const textToFilter = (data.nombreArticulo + ' ' + data.categoria + ' ' + data.ubicacion).toLowerCase();
      return textToFilter.includes(filter);
    };
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error('Error loading inventory from backend:', err);
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
    const dialogRef = this.dialog.open(InventoryFormComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadInventory();
      }
    });
  }

  deleteAsset(id: number): void {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.inventoryService.deleteAsset(id).subscribe({
        next: () => {
          console.log(`Asset with ID ${id} deleted successfully.`);
          this.loadInventory();
        },
        error: (err) => {
          console.error('Error deleting asset:', err);
        },
      });
    }
  }

  openEditDialog(asset: Inventory): void {
    const dialogRef = this.dialog.open(InventoryFormComponent, {
      width: '400px',
      disableClose: true,
      data: asset,
    });

    dialogRef.afterClosed().subscribe((success: boolean) => {
      if (success) {
        this.loadInventory();
      }
    });
  }
}
