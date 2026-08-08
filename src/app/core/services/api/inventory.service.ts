import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../../../features/inventory/inventory.component';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/v1/inventory';

  /**
   * Fetches the complete list of inventory assets from the backend API.
   */
  getAllInventory(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  /**
   * Sends a POST request to create a new asset in the database.
   */
  addAsset(asset: Omit<Inventory, 'id'>): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, asset);
  }

  /**
   * Sends a DELETE request to remove an asset by its ID.
   * @param id The unique identifier of the asset.
   */
  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Sends a PUT request to update an existing asset.
   * @param id The ID of the asset to update.
   * @param asset The updated data from the form.
   */
  updateAsset(id: number, asset: Partial<Inventory>): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, asset);
  }
}
