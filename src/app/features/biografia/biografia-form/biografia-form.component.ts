import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BiografiaService } from '../../../core/services/api/biografia.service';

@Component({
  selector: 'app-biografia-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './biografia-form.component.html',
  styleUrl: './biografia-form.component.scss',
})
export class BiografiaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<BiografiaFormComponent>);
  private biografiaService = inject(BiografiaService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  biographyId?: number;

  biografiaForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    contenido: ['', Validators.required],
    fechaHito: ['', Validators.required],
    imagenUrl: [''],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.biographyId = this.data.id;
      this.biografiaForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.biografiaForm.valid) {
      if (this.isEditMode && this.biographyId) {
        this.biografiaService.updateBiografia(this.biographyId, this.biografiaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating milestone:', err),
        });
      } else {
        this.biografiaService.addBiografia(this.biografiaForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving milestone:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
