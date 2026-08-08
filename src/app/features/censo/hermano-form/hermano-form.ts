import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
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

  // Form definition with strict validations
  hermanoForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellidos: ['', Validators.required],
    fechaAlta: ['', Validators.required],
    cuotaAlDia: [false],
  });

  /**
   * Submits the form data to the backend if all validations pass.
   */
  onSubmit(): void {
    if (this.hermanoForm.valid) {
      this.censoService.addHermano(this.hermanoForm.value).subscribe({
        next: () => {
          // Close the dialog and pass 'true' to indicate success
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error saving the new member:', err);
        },
      });
    }
  }

  /**
   * Closes the dialog without saving.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
