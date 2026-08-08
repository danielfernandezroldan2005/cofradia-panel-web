import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Biografia } from '../../../features/biografia/biografia.component';

@Injectable({
  providedIn: 'root',
})
export class BiografiaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/biografias';

  /**
   * Fetches the complete list of biography milestones from the backend API.
   */
  getAllBiografias(): Observable<Biografia[]> {
    return this.http.get<Biografia[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new milestone in the database.
   */
  addBiografia(biografia: Omit<Biografia, 'id'>): Observable<Biografia> {
    return this.http.post<Biografia>(this.apiUrl, biografia);
  }

  /**
   * Sends a DELETE request to remove a milestone by its ID.
   * @param id The unique identifier of the milestone.
   */
  deleteBiografia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing milestone.
   * @param id The ID of the milestone to update.
   * @param biografia The updated data from the form.
   */
  updateBiografia(id: number, biografia: Partial<Biografia>): Observable<Biografia> {
    return this.http.put<Biografia>(`${this.apiUrl}/${id}`, biografia);
  }
}
