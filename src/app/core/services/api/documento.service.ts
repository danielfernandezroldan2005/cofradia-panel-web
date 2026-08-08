import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documento } from '../../../features/documento/documento.component';

@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/documentos';

  /**
   * Fetches the complete list of documents from the backend API.
   */
  getAllDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new document in the database.
   */
  addDocumento(documento: Omit<Documento, 'id'>): Observable<Documento> {
    return this.http.post<Documento>(this.apiUrl, documento);
  }

  /**
   * Sends a DELETE request to remove a document by its ID.
   * @param id The unique identifier of the document.
   */
  deleteDocumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing document.
   * @param id The ID of the document to update.
   * @param documento The updated data from the form.
   */
  updateDocumento(id: number, documento: Partial<Documento>): Observable<Documento> {
    return this.http.put<Documento>(`${this.apiUrl}/${id}`, documento);
  }
}
