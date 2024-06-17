import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // ajustez selon votre configuration d'environnement

@Injectable({
  providedIn: 'root'
})
export class BonReceptionService {
  private apiUrl = 'http://localhost:3000/bonreception';
 
  constructor(private http: HttpClient) {}

  // Créer un bon de réception
  createBonReception(bonReceptionData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bonreceptions`, bonReceptionData);
  }

  // Récupérer tous les bons de réception
  getAllBonReceptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bonreceptions`);
  }

  // Récupérer un bon de réception par son ID
  getBonReceptionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bonreceptions/${id}`);
  }

  // Mettre à jour un bon de réception
  updateBonReception(id: string, bonReceptionData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bonreceptions/${id}`, bonReceptionData);
  }

  // Supprimer un bon de réception
  deleteBonReception(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bonreceptions/${id}`);
  }
}
