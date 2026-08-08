import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../../features/evento/evento.component';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/eventos';

  /**
   * Fetches the complete list of events from the backend API.
   */
  getAllEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new event in the database.
   */
  addEvento(evento: Omit<Evento, 'id'>): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  /**
   * Sends a DELETE request to remove an event by its ID.
   * @param id The unique identifier of the event.
   */
  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing event.
   * @param id The ID of the event to update.
   * @param evento The updated data from the form.
   */
  updateEvento(id: number, evento: Partial<Evento>): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }
}
