import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './fournisseur'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class fournisseurService {
  private apiUrl = 'http://localhost:3000/suppliers'; // URL de votre API

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }

  getSupplierById(id: string): Observable<Fournisseur> {
    return this.http.get<Fournisseur>(`${this.apiUrl}/${id}`);
  }

  addSupplier(supplier: Fournisseur): Observable<Fournisseur> {
    return this.http.post<Fournisseur>(this.apiUrl, supplier);
  }

  updateSupplier(id: string, supplier: Fournisseur): Observable<Fournisseur> {
    return this.http.put<Fournisseur>(`${this.apiUrl}/${id}`, supplier);
  }

  deleteSupplier(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchSuppliers(query: string): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(`${this.apiUrl}/search?query=${query}`);
  }

}
