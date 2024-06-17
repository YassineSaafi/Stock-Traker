import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from './devis';

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = 'http://localhost:3000/devis';

  constructor(private http: HttpClient) {}

  createDevis(devis: Devis): Observable<Devis> {
    return this.http.post<Devis>(`${this.apiUrl}/create`, devis);
  }

  updateDevis(id: string, devis: Devis): Observable<Devis> {
    return this.http.put<Devis>(`${this.apiUrl}/update/${id}`, devis);
  }

  deleteDevis(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getDevisByDate(date: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/by-date/${date}`);
  }

  getDevisByClient(clientId: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/by-client/${clientId}`);
  }

  getDevisById(id: string): Observable<Devis> {
    return this.http.get<Devis>(`${this.apiUrl}/by-id/${id}`);
  }

  getDevisByPaymentMethod(paymentMethod: string): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/by-payment/${paymentMethod}`);
  }

  getAllDevis(): Observable<Devis[]> {
    return this.http.get<Devis[]>(`${this.apiUrl}/`);
  }
}
