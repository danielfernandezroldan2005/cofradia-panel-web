import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CuotaService } from '../../../core/services/api/cuota.service';

@Component({
  selector: 'app-cuota-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './cuota-form.component.html',
  styleUrl: './cuota-form.component.scss',
})
export class CuotaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CuotaFormComponent>);
  private cuotaService = inject(CuotaService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  feeId?: number;

  cuotaForm: FormGroup = this.fb.group({
    idHermano: [null, [Validators.required, Validators.min(1)]],
    importe: [null, [Validators.required, Validators.min(0)]],
    fechaPago: ['', Validators.required],
    estado: ['Pendiente', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.feeId = this.data.id;
      this.cuotaForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.cuotaForm.valid) {
      if (this.isEditMode && this.feeId) {
        this.cuotaService.updateCuota(this.feeId, this.cuotaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating fee:', err),
        });
      } else {
        this.cuotaService.addCuota(this.cuotaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving fee:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
