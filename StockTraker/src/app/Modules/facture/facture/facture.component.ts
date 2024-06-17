import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FactureService } from '../facture.service';
import { Client } from '../../client/client';
import { Product } from '../../produit/produit';
import { Facture } from '../facture';
import { ClientService } from '../../client/client.service';
import * as numberToWords from 'number-to-words';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  factureForm: FormGroup;
  clients: Client[] = [];
  produits: Product[] = [];
  items: any[] = [];
  factures: Facture[] = [];
  quantite = 0;
  validation = false;
  Facture!: Facture;
  modalRef: NgbModalRef | undefined;

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private modalService: NgbModal,
    private clientService: ClientService
  ) {
    this.factureForm = this.fb.group({
      nomclient: ['', Validators.required],
      produitSelect: [''],
      quantite: ['', [Validators.required, Validators.min(1)]],
      paiement: ['', Validators.required],
      validation: [false]
    });
    this.Facture = {
      _id: '',
      num: '',
      client: '',
      produits: [],
      somme: 0,
      paiement: 'espèces',
      date: new Date(),
      validation: false
    };
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadProduits();
    this.loadFactures();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
        console.log('Clients chargés :', this.clients);
      },
      (error) => {
        console.error('Erreur lors du chargement des clients :', error);
      }
    );
  }

  loadProduits(): void {
    this.factureService.getProducts().subscribe(
      (data: Product[]) => {
        this.produits = data;
        console.log('Produits chargés :', this.produits);
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  loadFactures(): void {
    this.factureService.getFactures().subscribe(
      (data: Facture[]) => {
        this.factures = data;
        console.log('Factures chargées :', this.factures);
      },
      (error) => {
        console.error('Erreur lors du chargement des factures :', error);
      }
    );
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ajouterProduit(): void {
    const produitId = this.factureForm.get('produitSelect')?.value;
    const quantite = this.factureForm.get('quantite')?.value;

    if (!produitId || quantite <= 0) {
      alert('Veuillez sélectionner un produit et entrer une quantité valide.');
      return;
    }

    const produit = this.produits.find(p => p._id === produitId);
    if (!produit) {
      alert('Produit non trouvé.');
      return;
    }

    if (quantite > produit.qte) {
      alert(`La quantité achetée dépasse la quantité en stock (${produit.qte}).`);
      return;
    }

    const existingItem = this.items.find(item => item.idProduit === produitId);
    if (existingItem) {
      alert('Ce produit existe déjà dans la facture.');
      return;
    }

    this.items.push({
      idProduit: produitId,
      ref: produit.ref,
      nom: produit.nom,
      prix: produit.prix,
      qte: quantite
    });

    produit.qte -= quantite;

    this.factureForm.get('quantite')?.setValue(0);
  }

  calculerTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.prix * item.qte), 0);
  }

  genererFacture(): void {
    const nomClient = this.factureForm.get('nomclient')?.value;
    const paiement = this.factureForm.get('paiement')?.value;
    const client = this.clients.find(c => c.nom === nomClient);
  
    if (!client) {
      alert('Veuillez sélectionner un client valide.');
      return;
    }
  
    if (this.items.length === 0) {
      alert('Veuillez ajouter au moins un produit à la facture.');
      return;
    }
  
    for (const item of this.items) {
      if (item.qte <= 0) {
        alert('Veuillez spécifier une quantité supérieure à zéro pour tous les produits.');
        return;
      }
    }
  
    const facture: Facture = {
      _id: '',
      num: '',
      client: client.nom,
      adresse: client.adresse,
      produits: this.items.map(item => ({
        idProduit: item.idProduit,
        ref: item.ref, // Utilisation de la référence du produit
        nom: item.nom,
        prix: item.prix,
        qte: item.qte
      })),
      somme: this.calculerTotal(),
      paiement: paiement,
      date: new Date(),
      validation: this.factureForm.get('validation')?.value
    };
  
    this.factureService.createFacture(facture).subscribe(
      (data) => {
        alert('Facture créée avec succès.');
        this.factures.push(data); // Ajouter la nouvelle facture à la liste des factures
        this.loadFactures(); // Recharger la liste des factures
        this.resetForm(); // Réinitialiser le formulaire après la création
        this.modalRef?.close(); // Fermer le modal après la création réussie
      },
      (error) => {
        console.error('Erreur lors de la création de la facture : ', error);
        alert(`Erreur lors de la création de la facture: ${error.message}`);
        if (error.error && error.error.details) {
          alert(`Détails de l'erreur: ${error.error.details.join(', ')}`);
        }
      }
    );
  }
  

  resetForm(): void {
    this.factureForm.reset();
    this.items = [];
    this.quantite = 0;
  }

  validateFacture(id: string): void {
    this.factureService.updateFacture(id, { validation: true }).subscribe(() => {
      alert('Facture validée avec succès.');
    });
  }

  imprimerFacture(): void {
    const printContents = document.getElementById('factureDetails')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Recharge la page après l'impression pour restaurer le contenu original
    } else {
      console.error('Element #factureDetails not found.');
    }
  }

  loadClientDetails(nomClient: string): void {
    this.clientService.getClientById(nomClient).subscribe(
      (client: Client) => {
        if (client) {
          this.factureForm.patchValue({
            adresse: client.adresse,
            // Autres champs du formulaire à patcher avec les détails du client
          });
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des détails du client :', error);
      }
    );
  }
}
