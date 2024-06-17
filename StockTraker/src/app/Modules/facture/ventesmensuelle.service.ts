import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentesService {
  private baseUrl = 'http://localhost:3000/Dist'; // Changez ceci en fonction de votre configuration

  constructor(private http: HttpClient) { }

  getVentesMensuelles(clientId: string, year: number, month: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/mensuelles?clientId=${clientId}&year=${year}&month=${month}`);
  }
}
