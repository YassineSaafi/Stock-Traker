import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Devis } from '../devis';
import { DevisService } from '../devis.service';
import { Client } from '../../client/client';
import { ClientService } from '../../client/client.service';
import { ProductService } from '../../produit/produit.service';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {
  devisList: Devis[] = [];
  clients: Client[] = [];
  produits: any[] = [];
  factureForm!: FormGroup;
  items: any[] = [];
  modalRef!: NgbModalRef;
  updateMode = false;
  selectedDevis!: Devis;

  constructor(
    private devisService: DevisService,
    private clientService: ClientService,
    private produitService: ProductService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getDevis();
    this.getClients();
    this.getProduits();
    this.initForm();
  }

  initForm(): void {
    this.factureForm = this.fb.group({
      nomclient: ['', Validators.required],
      produitSelect: ['', Validators.required],
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  getDevis(): void {
    this.devisService.getAllDevis().subscribe(
      devis => {
        this.devisList = devis;
      },
      error => {
        console.error('Erreur lors de la récupération des devis:', error);
      }
    );
  }

  getClients(): void {
    this.clientService.getClients().subscribe(
      clients => {
        this.clients = clients;
      },
      error => {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    );
  }

  getProduits(): void {
    this.produitService.getProducts().subscribe(
      produits => {
        this.produits = produits;
      },
      error => {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    );
  }

  getClientName(clientId: string): string {
    const client = this.clients.find(c => c._id === clientId);
    return client ? client.nom : 'Client non trouvé';
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    this.modalRef.result.then(
      () => {
        this.resetForm();
      },
      (reason) => {
        this.resetForm();
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  ajouterProduit(): void {
    const produitId = this.factureForm.value.produitSelect;
    const quantite = this.factureForm.value.quantite;

    if (!quantite || quantite <= 0) {
      alert('Veuillez saisir une quantité valide.');
      return;
    }

    const produit = this.produits.find(p => p._id === produitId);
    
    if (produit) {
      const item = {
        idProduit: produit._id,
        ref: produit.ref,
        nom: produit.nom,
        qte: quantite,
        prix: produit.prix
      };
      this.items.push(item);
    }
  }

  genererFacture(): void {
    const clientId = this.factureForm.value.nomclient;
    const devi: Devis = {
      _id: '',
      num: this.generateUniqueId(),
      client: clientId,
      produits: this.items.map(item => ({
        idProduit: item.idProduit,
        qte: item.qte,
        prix: item.prix,
        nom: item.nom,
        ref: item.ref
      })),
      date: new Date(),
      somme: this.calculerTotal(),
    };
  
    console.log('Données envoyées pour la création du devis:', devi);
  
    this.devisService.createDevis(devi).subscribe(
      () => {
        alert('Devis créé avec succès.');
        this.getDevis();
        this.modalRef.close();
      },
      error => {
        console.error('Erreur lors de la création du devis:', error);
        alert('Erreur lors de la création du devis.');
      }
    );
  }
  

  supprimerDevis(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce devis?')) {
      this.devisService.deleteDevis(id).subscribe(
        () => {
          alert('Devis supprimé avec succès.');
          this.getDevis();
        },
        error => {
          console.error('Erreur lors de la suppression du devis:', error);
          alert('Erreur lors de la suppression du devis.');
        }
      );
    }
  }

  imprimerDevis(id: string): void {
    const printContents = document.getElementById(`devisDetails-${id}`);

    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    } else {
      console.error(`Élément #devisDetails-${id} non trouvé.`);
    }
  }

  calculerTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.prix * item.qte), 0);
  }

  modifierDevis(devis: Devis, content: any): void {
    this.updateMode = true;
    this.selectedDevis = devis;
    this.items = devis.produits.map(p => ({
      idProduit: p.idProduit,
      ref: this.produits.find(prod => prod._id === p.idProduit)?.ref || '',
      nom: this.produits.find(prod => prod._id === p.idProduit)?.nom || '',
      qte: p.qte,
      prix: p.prix
    }));

    this.factureForm.patchValue({
      nomclient: devis.client,
      produitSelect: '',
      quantite: ''
    });

    this.openModal(content); // Ouvrir le modal pour modification
  }

  updateFacture(): void {
    if (this.updateMode) {
      const updatedDevis: Devis = {
        _id: this.selectedDevis._id,
        num: this.selectedDevis.num,
        client: this.factureForm.value.nomclient,
        produits: this.items.map(item => ({
          idProduit: item.idProduit,
          qte: item.qte,
          prix: item.prix,
          nom: item.nom,
          ref: item.ref
        })),
        date: this.selectedDevis.date,
        somme: this.calculerTotal(),
      };
  
      this.devisService.updateDevis(updatedDevis._id, updatedDevis).subscribe(
        () => {
          alert('Devis modifié avec succès.');
          this.getDevis();
          this.modalRef.close();
          this.updateMode = false;
        },
        error => {
          console.error('Erreur lors de la modification du devis:', error);
          alert('Erreur lors de la modification du devis.');
        }
      );
    }
  }

  private generateUniqueId(): string {
    return 'DEV-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'en appuyant sur ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'en cliquant sur le fond';
    } else {
      return `avec: ${reason}`;
    }
  }

  private resetForm(): void {
    this.factureForm.reset();
    this.items = [];
    this.updateMode = false;
  }
}
