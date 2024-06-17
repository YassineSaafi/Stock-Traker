import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FournisseurDevisService {
  private apiUrl = 'http://localhost:3000/def'; 

  constructor(private http: HttpClient) {}

  createDevis(devis: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, devis);
  }

  getDevis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getDevisById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateDevis(id: string, devis: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, devis);
  }

  deleteDevis(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
