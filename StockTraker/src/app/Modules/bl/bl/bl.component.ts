import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef  , ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BonDeLivraisonService } from '../bl.service'; // Adjust the path accordingly
import { Client } from '../../client/client';
import { Product } from '../../produit/produit';
import { BonDeLivraison } from '../bl';



@Component({
  selector: 'app-bon-de-livraison',
  templateUrl: './bl.component.html',
  styleUrls: ['./bl.component.scss']
})
export class BonDeLivraisonComponent implements OnInit {
  bonDeLivraisonForm: FormGroup;
  clients: Client[] = [];
  produits: Product[] = [];
  items: any[] = [];
  bonsDeLivraison: BonDeLivraison[] = [];
  quantite = 0;
  modalRef: NgbModalRef | undefined;

  constructor(
    private fb: FormBuilder,
    private bonDeLivraisonService: BonDeLivraisonService,
    private modalService: NgbModal
  ) {
    this.bonDeLivraisonForm = this.fb.group({
      nomclient: ['', Validators.required],
      produitSelect: [''],
      quantite: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadProduits();
    this.loadBonsDeLivraison();
  }

  loadClients(): void {
    this.bonDeLivraisonService.getClients().subscribe(
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
    this.bonDeLivraisonService.getProducts().subscribe(
      (data: Product[]) => {
        this.produits = data;
        console.log('Produits chargés :', this.produits);
      },
      (error) => {
        console.error('Erreur lors du chargement des produits :', error);
      }
    );
  }

  loadBonsDeLivraison(): void {
    this.bonDeLivraisonService.getBonsDeLivraison().subscribe(
      (data: BonDeLivraison[]) => {
        this.bonsDeLivraison = data;
        console.log('Bons de livraison chargés :', this.bonsDeLivraison);
      },
      (error) => {
        console.error('Erreur lors du chargement des bons de livraison :', error);
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
    const produitId = this.bonDeLivraisonForm.get('produitSelect')?.value;
    const quantite = this.bonDeLivraisonForm.get('quantite')?.value;

    if (!produitId || quantite <= 0) {
      alert('Veuillez sélectionner un produit et entrer une quantité valide.');
      return;
    }

    const produit = this.produits.find(p => p._id === produitId);
    if (!produit) {
      alert('Produit non trouvé.');
      return;
    }

    const existingItem = this.items.find(item => item.idProduit === produitId);
    if (existingItem) {
      alert('Ce produit existe déjà dans le bon de livraison.');
      return;
    }

    this.items.push({
      idProduit: produitId,
      ref: produit.ref,
      nom: produit.nom,
      prix: produit.prix,
      qte: quantite
    });

    this.bonDeLivraisonForm.get('quantite')?.setValue(0);
  }

  calculerTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.prix * item.qte), 0);
  }

  genererBonDeLivraison(): void {
    const nomClient = this.bonDeLivraisonForm.get('nomclient')?.value;
    const client = this.clients.find(c => c.nom === nomClient);

    if (!client) {
      alert('Veuillez sélectionner un client valide.');
      return;
    }

    if (this.items.length === 0) {
      alert('Veuillez ajouter au moins un produit au bon de livraison.');
      return;
    }

    for (const item of this.items) {
      if (item.qte <= 0) {
        alert('Veuillez spécifier une quantité supérieure à zéro pour tous les produits.');
        return;
      }
    }

    const bonDeLivraison: BonDeLivraison = {
      _id: '',
      num: '12',
      client: client.nom,
      adresse: client.adresse,
      produits: this.items,
      somme: this.calculerTotal(),
      date: new Date()
    };

    this.bonDeLivraisonService.ajouterBonDeLivraison(bonDeLivraison).subscribe(
      (data) => {
        alert('Bon de livraison créé avec succès.');
        this.loadBonsDeLivraison(); // Reload the list of bons de livraison
        this.resetForm();
        this.modalRef?.close(); // Close modal after success
      },
      (error) => {
        console.error('Erreur lors de la création du bon de livraison : ', error);
        alert(`Erreur lors de la création du bon de livraison: ${error.message}`);
        if (error.error && error.error.details) {
          alert(`Détails de l'erreur: ${error.error.details.join(', ')}`);
        }
      }
    );
  }

  resetForm(): void {
    this.bonDeLivraisonForm.reset();
    this.items = [];
    this.quantite = 0;
  }
}
