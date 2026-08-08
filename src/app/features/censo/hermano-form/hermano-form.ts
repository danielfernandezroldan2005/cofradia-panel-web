import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CensoService } from '../../../core/services/api/censoService';

@Component({
  selector: 'app-hermano-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './hermano-form.html',
  styleUrl: './hermano-form.scss',
})
export class HermanoForm {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<HermanoForm>);
  private censoService = inject(CensoService);

  // DATA INJECTION: Angular injects the member data here if opened from the "Edit" button
  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  memberId?: number;

  // Form definition with strict validations
  hermanoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaAlta: ['', Validators.required],
    cuotaAlDia: [false],
  });

  ngOnInit(): void {
    // If data exists, it means the modal was opened in edit mode
    if (this.data) {
      this.isEditMode = true;
      this.memberId = this.data.id;
      // Angular automatically fills the inputs with the received data matching the formControlNames
      this.hermanoForm.patchValue(this.data);
    }
  }

  /**
   * Submits the form data to the backend if all validations pass.
   */
  onSubmit(): void {
    if (this.hermanoForm.valid) {
      if (this.isEditMode && this.memberId) {
        // EDIT MODE
        this.censoService.updateHermano(this.memberId, this.hermanoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating member:', err),
        });
      } else {
        // CREATE MODE
        this.censoService.addHermano(this.hermanoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving member:', err),
        });
      }
    }
  }

  /**
   * Closes the dialog without saving.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
