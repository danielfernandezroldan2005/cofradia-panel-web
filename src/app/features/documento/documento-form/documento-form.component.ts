import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DocumentoService } from '../../../core/services/api/documento.service';

@Component({
  selector: 'app-documento-form',
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
  templateUrl: './documento-form.component.html',
  styleUrl: './documento-form.component.scss',
})
export class DocumentoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DocumentoFormComponent>);
  private documentoService = inject(DocumentoService);

  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  documentId?: number;

  documentoForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    tipo: ['Acta', Validators.required],
    fechaCreacion: ['', Validators.required],
    enlaceArchivo: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.isEditMode = true;
      this.documentId = this.data.id;
      this.documentoForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.documentoForm.valid) {
      if (this.isEditMode && this.documentId) {
        this.documentoService.updateDocumento(this.documentId, this.documentoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating document:', err),
        });
      } else {
        this.documentoService.addDocumento(this.documentoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving document:', err),
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
