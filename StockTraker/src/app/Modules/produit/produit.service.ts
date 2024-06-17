// product.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './produit'; // Importer votre interface Product

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; // Remplacer par votre URL API

  constructor(private http: HttpClient) {}

  // Méthodes pour interagir avec les endpoints de votre API

  // Créer un produit
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  // Supprimer un produit par son ID
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Récupérer un produit par son ID
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour un produit par son ID
  updateProduct(id: string, updates: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, updates);
  }

  // Définir le prix d'un produit par son ID
  setProductPrice(id: string, prix: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}/prix`, { prix });
  }

  // Définir la quantité d'un produit par son ID
  setProductQuantity(id: string, qte: number): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}/qte`, { qte });
  }

  // Récupérer tous les produits
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}`);
  }
  getProduitsByCategories(categories: string[]): Observable<Product[]> {
    const params = { categories: categories.join(',') };
    return this.http.get<Product[]>(`${this.baseUrl}/by-categories`, { params });
  }
  getCategoriesProduits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
    
  }
}
