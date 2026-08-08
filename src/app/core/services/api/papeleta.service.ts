import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Papeleta } from '../../../features/papeleta/papeleta.component';

@Injectable({
  providedIn: 'root',
})
export class PapeletaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/papeletas';

  /**
   * Fetches the complete list of procession assignments from the backend API.
   */
  getAllPapeletas(): Observable<Papeleta[]> {
    return this.http.get<Papeleta[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new assignment in the database.
   */
  addPapeleta(papeleta: Omit<Papeleta, 'id'>): Observable<Papeleta> {
    return this.http.post<Papeleta>(this.apiUrl, papeleta);
  }

  /**
   * Sends a DELETE request to remove an assignment by its ID.
   * @param id The unique identifier of the assignment.
   */
  deletePapeleta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing assignment.
   * @param id The ID of the assignment to update.
   * @param papeleta The updated data from the form.
   */
  updatePapeleta(id: number, papeleta: Partial<Papeleta>): Observable<Papeleta> {
    return this.http.put<Papeleta>(`${this.apiUrl}/${id}`, papeleta);
  }
}
