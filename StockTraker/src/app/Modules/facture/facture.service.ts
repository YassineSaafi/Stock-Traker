import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from './facture';
import { Client } from '../client/client';
import { Product } from '../produit/produit';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private baseUrl = 'http://localhost:3000/facture';
  private clientsUrl = 'http://localhost:3000/clients';
  private productsUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  createFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.baseUrl}/create`, facture);
  }

  updateFacture(id: string, updates: any): Observable<Facture> {
    return this.http.put<Facture>(`${this.baseUrl}/update/${id}`, updates);
  }

  deleteFacture(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.baseUrl);
  }

  getFactureById(id: string): Observable<Facture> {
    return this.http.get<Facture>(`${this.baseUrl}/byid/${id}`);
  }

  getFacturesByClient(clientId: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/byclient/${clientId}`);
  }

  getFacturesByDate(date: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/bydate/${date}`);
  }

  getFacturesByPaymentMethod(paymentMethod: string): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/bypaymentmethod/${paymentMethod}`);
  }

  printFacture(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/print/${id}`);
  }

  validateFacture(id: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/validate/${id}`, { validation: true });
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }
  getAllFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(`${this.baseUrl}/invoices`);
  }
}
