import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChequeInterface } from './cheque-interface';

@Injectable({
  providedIn: 'root'
})
export class ChequeService {
  private apiUrl = 'http://localhost:3000/chq'; // À ajuster selon votre URL API

  constructor(private http: HttpClient) {}

  
  
  addCheque(chequeData: FormData): Observable<ChequeInterface> {
    return this.http.post<ChequeInterface>(`${this.apiUrl}/add`, chequeData);
  }

  // Récupérer tous les chèques
  getAllCheques(): Observable<ChequeInterface[]> {
    return this.http.get<ChequeInterface[]>(`${this.apiUrl}/`);
  }
  // Update a cheque by ID
updateCheque(id: string, chequeData: FormData): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/chq/${id}`, chequeData);
}


  // Supprimer un chèque par ID
  deleteCheque(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  // Rechercher des chèques par date
  getChequesByDate(date: Date): Observable<ChequeInterface[]> {
    return this.http.get<ChequeInterface[]>(`${this.apiUrl}/date/${date}`);
  }

  // Rechercher des chèques par client
  getChequesByClient(clientId: string): Observable<ChequeInterface[]> {
    return this.http.get<ChequeInterface[]>(`${this.apiUrl}/client/${clientId}`);
  }

  // Rechercher des chèques par état (versé ou non versé)
  getChequesByEtat(etat: string): Observable<ChequeInterface[]> {
    return this.http.get<ChequeInterface[]>(`${this.apiUrl}/etat/${etat}`);
  }
  
}
