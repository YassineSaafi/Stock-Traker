import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../produit.service';
import { Product } from '../produit';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../category.service';
import { Category } from '../category'; // Assurez-vous d'avoir le bon chemin

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {
  produits: Product[] = [];
  produitForm: FormGroup;
  editingProduit: Product | null = null;
  formSubmitted = false;
  closeResult = '';
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private produitService: ProductService,
    private categoryService: CategoryService,
    private modalService: NgbModal
  ) {
    this.produitForm = this.fb.group({
      ref: ['', Validators.required],
      nom: ['', Validators.required],
      qte: ['', Validators.required],
      prix: ['', Validators.required],
      categorieNom: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.loadProduits();
    this.loadCategories();
  }

  loadProduits(): void {
    this.produitService.getProducts().subscribe((data: Product[]) => {
      this.produits = data;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      console.log('Catégories chargées :', this.categories); // Vérifiez la console pour les données de catégorie
    });
  }
  

  onSubmit(modal: any): void {
    this.formSubmitted = true;
    if (this.produitForm.valid) {
      const formData = this.produitForm.value;
      console.log(formData);
      // Appeler le service Angular pour ajouter le produit dans la base de données
      this.produitService.addProduct(formData).subscribe(
        () => {
          // Si l'ajout est réussi, mettre à jour la liste des produits en rechargeant les données depuis le backend
          this.loadProduits();
          
          // Fermer le modal
          modal.close();
          
          // Réinitialiser le formulaire
          this.produitForm.reset();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit :', error);
        }
      );
    }
  }
  
  

  onEdit(content: any, produit: Product): void {
    this.editingProduit = produit;
    this.produitForm.patchValue(produit);
    this.openModal(content);
  }

  onDelete(id: string): void {
    this.produitService.deleteProduct(id).subscribe(() => {
      this.loadProduits();
    });
  }

  openModal(content: any, produit?: Product): void {
    if (produit) {
      this.editingProduit = produit;
      this.produitForm.patchValue(produit);
    } else {
      this.editingProduit = null;
      this.produitForm.reset();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}
