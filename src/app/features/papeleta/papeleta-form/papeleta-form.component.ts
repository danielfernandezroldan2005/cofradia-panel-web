import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { PapeletaService } from '../../../core/services/api/papeleta.service';

@Component({
  selector: 'app-papeleta-form',
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
  templateUrl: './papeleta-form.component.html',
  styleUrl: './papeleta-form.component.scss',
})
export class PapeletaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<PapeletaFormComponent>);
  private papeletaService = inject(PapeletaService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  assignmentId?: number;

  papeletaForm: FormGroup = this.fb.group({
    idHermano: [null, [Validators.required, Validators.min(1)]],
    puesto: ['', Validators.required],
    anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
    estado: ['Pendiente', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.assignmentId = this.data.id;
      this.papeletaForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.papeletaForm.valid) {
      if (this.isEditMode && this.assignmentId) {
        this.papeletaService.updatePapeleta(this.assignmentId, this.papeletaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating assignment:', err),
        });
      } else {
        this.papeletaService.addPapeleta(this.papeletaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving assignment:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
