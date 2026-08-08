import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cuota } from '../../../features/cuota/cuota.component';

@Injectable({
  providedIn: 'root',
})
export class CuotaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/cuotas';

  /**
   * Fetches the complete list of fees from the backend API.
   */
  getAllCuotas(): Observable<Cuota[]> {
    return this.http.get<Cuota[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new fee in the database.
   */
  addCuota(cuota: Omit<Cuota, 'id'>): Observable<Cuota> {
    return this.http.post<Cuota>(this.apiUrl, cuota);
  }

  /**
   * Sends a DELETE request to remove a fee by its ID.
   * @param id The unique identifier of the fee.
   */
  deleteCuota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing fee.
   * @param id The ID of the fee to update.
   * @param cuota The updated data from the form.
   */
  updateCuota(id: number, cuota: Partial<Cuota>): Observable<Cuota> {
    return this.http.put<Cuota>(`${this.apiUrl}/${id}`, cuota);
  }
}
