import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EventoService } from '../../../core/services/api/evento.service';

@Component({
  selector: 'app-evento-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './evento-form.component.html',
  styleUrl: './evento-form.component.scss',
})
export class EventoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EventoFormComponent>);
  private eventoService = inject(EventoService);

  // DATA INJECTION: Angular injects the event data here if opened from the "Edit" button
  private data = inject(MAT_DIALOG_DATA, { optional: true });

  isEditMode = false;
  eventId?: number;

  // Form definition with strict validations
  eventoForm: FormGroup = this.fb.group({
    titulo: ['', Validators.required],
    fecha: ['', Validators.required],
    descripcion: ['', Validators.required],
    ubicacion: ['', Validators.required],
  });

  ngOnInit(): void {
    // If data exists, it means the modal was opened in edit mode
    if (this.data) {
      this.isEditMode = true;
      this.eventId = this.data.id;
      // Angular automatically fills the inputs with the received data matching the formControlNames
      this.eventoForm.patchValue(this.data);
    }
  }

  /**
   * Submits the form data to the backend if all validations pass.
   */
  onSubmit(): void {
    if (this.eventoForm.valid) {
      if (this.isEditMode && this.eventId) {
        // EDIT MODE
        this.eventoService.updateEvento(this.eventId, this.eventoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating event:', err),
        });
      } else {
        // CREATE MODE
        this.eventoService.addEvento(this.eventoForm.value).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error saving event:', err),
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
