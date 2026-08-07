import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hermano } from '../../../features/censo/censo';

@Injectable({
  providedIn: 'root',
})
export class CensoService {
  // Inject the HTTP client to make network requests
  private http = inject(HttpClient);

  // Define the base URL of your Java Spring Boot backend
  // (We will move this to an environment file later for better practices)
  private apiUrl = 'http://localhost:8080/api/v1/hermanos';

  /**
   * Fetches the complete list of 'hermanos' from the backend API.
   * @returns An Observable emitting an array of Hermano objects.
   */
  getAllHermanos(): Observable<Hermano[]> {
    return this.http.get<Hermano[]>(this.apiUrl);
  }
}
