import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuditoriaService } from '../../../core/services/api/auditoria.service';

@Component({
  selector: 'app-auditoria-form',
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
  templateUrl: './auditoria-form.component.html',
  styleUrl: './auditoria-form.component.scss',
})
export class AuditoriaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AuditoriaFormComponent>);
  private auditoriaService = inject(AuditoriaService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  auditId?: number;

  auditoriaForm: FormGroup = this.fb.group({
    entidadAfectada: ['', Validators.required],
    operacion: ['CREAR', Validators.required],
    fechaOperacion: ['', Validators.required],
    usuario: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.auditId = this.data.id;
      this.auditoriaForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.auditoriaForm.valid) {
      if (this.isEditMode && this.auditId) {
        this.auditoriaService.updateAuditoria(this.auditId, this.auditoriaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating audit log:', err),
        });
      } else {
        this.auditoriaService.addAuditoria(this.auditoriaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving audit log:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
