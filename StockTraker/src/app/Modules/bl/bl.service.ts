import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BonDeLivraison } from './bl';
import { Client } from '../client/client';
import { Product } from '../produit/produit';

@Injectable({
  providedIn: 'root'
})
export class BonDeLivraisonService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }

  getBonsDeLivraison(): Observable<BonDeLivraison[]> {
    return this.http.get<BonDeLivraison[]>(`${this.apiUrl}/bl`);
  }

  ajouterBonDeLivraison(bonDeLivraison: BonDeLivraison): Observable<BonDeLivraison> {
    return this.http.post<BonDeLivraison>(`${this.apiUrl}/bl`, bonDeLivraison);
  }

  imprimerBonDeLivraison(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bl/${id}/imprimer`, { responseType: 'blob' });
  }
}
