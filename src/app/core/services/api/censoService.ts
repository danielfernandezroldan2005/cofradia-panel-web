import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hermano } from '../../../features/censo/censo';

@Injectable({
  providedIn: 'root',
})
export class CensoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/hermanos';

  /**
   * Fetches the complete list of 'hermanos' from the backend API.
   */
  getAllHermanos(): Observable<Hermano[]> {
    return this.http.get<Hermano[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new member in the database.
   */
  addHermano(hermano: Omit<Hermano, 'id'>): Observable<Hermano> {
    return this.http.post<Hermano>(this.apiUrl, hermano);
  }

  /**
   * Sends a DELETE request to remove a member by their ID.
   * @param id The unique identifier of the member.
   */
  deleteHermano(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
