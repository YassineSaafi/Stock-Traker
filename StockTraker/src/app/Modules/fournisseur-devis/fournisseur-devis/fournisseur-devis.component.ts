import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FournisseurDevisService } from '../fournisseur-devis.service';
import { fournisseurService } from '../../fournisseur/fournisseur.service';
import { ProductService } from '../../produit/produit.service';

@Component({
  selector: 'app-fournisseur-devis',
  templateUrl: './fournisseur-devis.component.html',
  styleUrls: ['./fournisseur-devis.component.scss']
})
export class FournisseurDevisComponent implements OnInit {
  devisList: any[] = [];
  fournisseurs: any[] = [];
  produits: any[] = [];
  newDevis: any = {
    reference: '',
    fournisseur: '',
    produits: [],
    total: 0
  };
  newProduit: any = {
    produit: '',
    quantite: 0,
    prixUnitaire: 0
  };

  constructor(
    private devisService: FournisseurDevisService,
    private modalService: NgbModal,
    private fournisseurService: fournisseurService,
    private produitService: ProductService
  ) {}

  ngOnInit(): void {
    this.fetchDevis();
    this.fetchFournisseurs();
    this.fetchProduits();
  }

  fetchDevis(): void {
    this.devisService.getDevis().subscribe(
      (data) => {
        this.devisList = data;
      },
      (error) => {
        console.error('Error fetching devis', error);
      }
    );
  }

  fetchFournisseurs(): void {
    this.fournisseurService.getSuppliers().subscribe(
      (data) => {
        this.fournisseurs = data;
      },
      (error) => {
        console.error('Error fetching fournisseurs', error);
      }
    );
  }

  fetchProduits(): void {
    this.produitService.getProducts().subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Error fetching produits', error);
      }
    );
  }

  open(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  addProduitToDevis(): void {
    this.newDevis.produits.push({ ...this.newProduit });
    this.calculateTotal();
    this.newProduit = { produit: '', quantite: 0, prixUnitaire: 0 };
  }

  calculateTotal(): void {
    this.newDevis.total = this.newDevis.produits.reduce((acc: number, prod: any) => acc + prod.quantite * prod.prixUnitaire, 0);
  }

  saveDevis(): void {
    console.log("Saving devis:", this.newDevis); // Log les données du devis
    this.devisService.createDevis(this.newDevis).subscribe(
      (data) => {
        console.log("Devis saved successfully:", data); // Log la réponse
        this.devisList.push(data);
        this.modalService.dismissAll();
        this.newDevis = { reference: '', fournisseur: '', produits: [], total: 0 };
      },
      (error) => {
        console.error('Error creating devis', error);
      }
    );
  }

  deleteDevis(id: string): void {
    this.devisService.deleteDevis(id).subscribe(
      () => {
        this.devisList = this.devisList.filter(devis => devis._id !== id);
      },
      (error) => {
        console.error('Error deleting devis', error);
      }
    );
  }
}
