import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InventoryService } from '../../../core/services/api/inventory.service';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './inventory-form.component.html',
  styleUrl: './inventory-form.component.scss',
})
export class InventoryFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<InventoryFormComponent>);
  private inventoryService = inject(InventoryService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  assetId?: number;

  inventoryForm: FormGroup = this.fb.group({
    nombreArticulo: ['', Validators.required],
    categoria: ['', Validators.required],
    estadoConservacion: ['', Validators.required],
    ubicacion: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.assetId = this.data.id;
      this.inventoryForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      if (this.isEditMode && this.assetId) {
        this.inventoryService.updateAsset(this.assetId, this.inventoryForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating asset:', err),
        });
      } else {
        this.inventoryService.addAsset(this.inventoryForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving asset:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
