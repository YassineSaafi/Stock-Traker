// src/app/services/inventory.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../inventaire/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/inventory';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getItemById(id: string): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }

  createItem(item: Inventory): Observable<Inventory> {
    return this.http.post<Inventory>(this.apiUrl, item);
  }

  updateItem(id: string, item: Inventory): Observable<Inventory> {
    return this.http.put<Inventory>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getItemsByCategories(categories: string[]): Observable<Inventory[]> {
    return this.http.post<Inventory[]>(`${this.apiUrl}/by-categories`, { categories });
  }
  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  
}
