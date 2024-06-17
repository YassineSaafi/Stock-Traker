import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BonReceptionService } from '../bon-reception.service';
import { fournisseurService } from '../../fournisseur/fournisseur.service';
import { ProductService } from '../../produit/produit.service';

@Component({
  selector: 'app-bon-reception',
  templateUrl: './bon-reception.component.html',
  styleUrls: ['./bon-reception.component.scss']
})
export class BonReceptionComponent implements OnInit {
  bonReceptions: any[] = [];
  bonReceptionForm: FormGroup;
  fournisseurs: any[] = [];
  produits: any[] = [];
  isEditing: boolean = false;
  selectedBonReception: any;

  constructor(
    private bonReceptionService: BonReceptionService,
    private fournisseurService: fournisseurService,
    private produitService: ProductService,
    private fb: FormBuilder
  ) {
    this.bonReceptionForm = this.fb.group({
      reference: ['', Validators.required],
      fournisseur: ['', Validators.required],
      produits: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadBonReceptions();
    this.loadFournisseurs();
    this.loadProduits();
  }

  loadBonReceptions() {
    this.bonReceptionService.getAllBonReceptions().subscribe(
      (data) => {
        this.bonReceptions = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des bons de réception', error);
      }
    );
  }

  loadFournisseurs() {
    this.fournisseurService.getSuppliers().subscribe(
      (data) => {
        this.fournisseurs = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des fournisseurs', error);
      }
    );
  }

  loadProduits() {
    this.produitService.getProducts().subscribe(
      (data) => {
        this.produits = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
      }
    );
  }

  saveBonReception() {
    if (this.bonReceptionForm.valid) {
      if (this.isEditing) {
        this.updateBonReception();
      } else {
        this.createBonReception();
      }
    } else {
      // Gérer les erreurs de validation si nécessaire
    }
  }

  createBonReception() {
    this.bonReceptionService.createBonReception(this.bonReceptionForm.value).subscribe(
      (data) => {
        console.log('Bon de réception créé avec succès', data);
        this.loadBonReceptions();
        this.resetForm();
      },
      (error) => {
        console.error('Erreur lors de la création du bon de réception', error);
      }
    );
  }

  updateBonReception() {
    const bonReceptionId = this.selectedBonReception._id;
    this.bonReceptionService.updateBonReception(bonReceptionId, this.bonReceptionForm.value).subscribe(
      (data) => {
        console.log('Bon de réception mis à jour avec succès', data);
        this.loadBonReceptions();
        this.resetForm();
        this.isEditing = false;
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du bon de réception', error);
      }
    );
  }

  editBonReception(bonReception: any) {
    this.selectedBonReception = bonReception;
    this.bonReceptionForm.patchValue({
      reference: bonReception.reference,
      fournisseur: bonReception.fournisseur,
      produits: this.mapProduits(bonReception.produits)
    });
    this.isEditing = true;
  }

  mapProduits(produits: any[]): FormGroup[] {
    return produits.map(produit => this.fb.group({
      produit: [produit.produit._id, Validators.required],
      quantite: [produit.quantite, Validators.required]
    }));
  }

  deleteBonReception(bonReceptionId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bon de réception ?')) {
      this.bonReceptionService.deleteBonReception(bonReceptionId).subscribe(
        (data) => {
          console.log('Bon de réception supprimé avec succès', data);
          this.loadBonReceptions();
        },
        (error) => {
          console.error('Erreur lors de la suppression du bon de réception', error);
        }
      );
    }
  }

  resetForm() {
    this.bonReceptionForm.reset();
    this.isEditing = false;
    this.selectedBonReception = null;
  }

  addProduit(): void {
    const produitFormGroup = this.fb.group({
      produit: ['', Validators.required],
      quantite: ['', Validators.required]
    });
    this.produitsArray.push(produitFormGroup);
  }

  removeProduit(index: number): void {
    this.produitsArray.removeAt(index);
  }

  get produitsArray(): FormArray {
    return this.bonReceptionForm.get('produits') as FormArray;
  }
}
