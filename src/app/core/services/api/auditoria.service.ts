import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auditoria } from '../../../features/auditoria/auditoria.component';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/auditorias';

  /**
   * Fetches the complete list of audit logs from the backend API.
   */
  getAllAuditorias(): Observable<Auditoria[]> {
    return this.http.get<Auditoria[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new audit log in the database.
   */
  addAuditoria(auditoria: Omit<Auditoria, 'id'>): Observable<Auditoria> {
    return this.http.post<Auditoria>(this.apiUrl, auditoria);
  }

  /**
   * Sends a DELETE request to remove an audit log by its ID.
   * @param id The unique identifier of the audit log.
   */
  deleteAuditoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing audit log.
   * @param id The ID of the audit log to update.
   * @param auditoria The updated data from the form.
   */
  updateAuditoria(id: number, auditoria: Partial<Auditoria>): Observable<Auditoria> {
    return this.http.put<Auditoria>(`${this.apiUrl}/${id}`, auditoria);
  }
}
