import { Component, OnInit } from '@angular/core';
import { Facture } from '../facture';
import { FactureService } from '../facture.service';
import { ClientService } from '../../client/client.service';
import { ProductService } from '../../produit/produit.service';
import { Client } from '../../client/client';
import { Product } from '../../produit/produit';
import * as numberToWords from 'number-to-words';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.scss']
})
export class VenteComponent implements OnInit {
  factures: Facture[] = [];
  facturesFiltrees: Facture[] = [];
  clients: Client[] = [];
  produits: Product[] = [];
  selectedClient: string = '';
  selectedProduit: string = '';

  constructor(
    private factureService: FactureService,
    private clientService: ClientService,
    private produitService: ProductService
  ) { }

  ngOnInit(): void {
    this.getFactures();
    this.getClients();
    this.getProduits();
  }

  getFactures(): void {
    this.factureService.getFactures().subscribe(
      factures => {
        this.factures = factures;
        this.facturesFiltrees = factures;
        console.log('Factures fetched:', this.factures);
      },
      error => {
        console.error('Error fetching factures:', error);
      }
    );
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
        console.log('Clients fetched:', this.clients);
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  getProduits(): void {
    this.produitService.getProducts().subscribe(
      produits => {
        this.produits = produits;
        console.log('Produits fetched:', this.produits);
      },
      error => {
        console.error('Error fetching produits:', error);
      }
    );
  }

  filtrerFactures(): void {
    this.facturesFiltrees = this.factures.filter(facture => {
      const clientMatch = this.selectedClient === '' || facture.client === this.getClientNameById(this.selectedClient);
      const produitMatch = this.selectedProduit === '' || facture.produits.some(produit => produit.nom === this.selectedProduit || produit.ref === this.selectedProduit);
      return clientMatch && produitMatch;
    });
  }

  getClientNameById(clientId: string): string | undefined {
    const client = this.clients.find(c => c._id === clientId);
    return client ? client.nom : undefined;
  }

  modifierFacture(facture: Facture): void {
    console.log('Modifier facture:', facture);
  }

  supprimerFacture(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette facture?')) {
      this.factureService.deleteFacture(id).subscribe(
        () => {
          alert('Facture supprimée avec succès.');
          this.getFactures(); // Recharger la liste des factures après suppression
        },
        error => {
          console.error('Erreur lors de la suppression de la facture:', error);
          alert('Erreur lors de la suppression de la facture.');
        }
      );
    }
  }

  imprimerFacture(id: string): void {
    const printContents = document.getElementById(`factureDetails-${id}`);

    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    } else {
      console.error(`Element #factureDetails-${id} not found.`);
    }
  }
}
