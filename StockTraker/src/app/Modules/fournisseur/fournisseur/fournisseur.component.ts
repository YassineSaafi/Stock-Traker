import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fournisseurService } from '../fournisseur.service';
import { Fournisseur } from '../fournisseur';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss']
})
export class FournisseurComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];
  fournisseurForm: FormGroup;
  searchForm: FormGroup;
  editingFournisseur: Fournisseur | null = null;
  closeResult = '';
  alertMessage: string | null = null; 
  alertType: string | null = null;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private fournisseurService: fournisseurService,
    private modalService: NgbModal
  ) {
    this.fournisseurForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });

    this.searchForm = this.fb.group({
      fournisseurId: ['']
    });
  }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.fournisseurService.getSuppliers().subscribe((data: Fournisseur[]) => {
      this.fournisseurs = data;
    });
  }

  get formControls() {
    return this.fournisseurForm.controls;
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.fournisseurForm.valid) {
      if (this.editingFournisseur) {
        this.fournisseurService.updateSupplier(this.editingFournisseur._id!, this.fournisseurForm.value).subscribe(() => {
          this.loadFournisseurs();
          this.editingFournisseur = null;
          this.fournisseurForm.reset();
          this.formSubmitted = false;
          this.showAlert('Fournisseur mis à jour avec succès', 'success');
        });
      } else {
        this.fournisseurService.addSupplier(this.fournisseurForm.value).subscribe(() => {
          this.loadFournisseurs();
          this.fournisseurForm.reset();
          this.formSubmitted = false;
          this.showAlert('Fournisseur ajouté avec succès', 'success');
        });
      }
    }
  }

  onEdit(fournisseur: Fournisseur): void {
    this.editingFournisseur = fournisseur;
    this.fournisseurForm.patchValue(fournisseur);
  }

  onDelete(fournisseurId: string | undefined): void {
    if (fournisseurId) {
      this.fournisseurService.deleteSupplier(fournisseurId).subscribe(
        () => {
          this.loadFournisseurs();
          this.showAlert('Fournisseur supprimé avec succès', 'success');
        },
        (error) => {
          console.error('Erreur lors de la suppression du fournisseur : ', error);
          this.showAlert('Erreur lors de la suppression du fournisseur', 'danger');
        }
      );
    } else {
      console.error('ID du fournisseur non valide : ', fournisseurId);
      this.showAlert('ID du fournisseur non valide', 'danger');
    }
  }

  openModal(content: any): void {
    this.fournisseurForm.reset();
    this.editingFournisseur = null;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Fermé avec: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  onSearch(): void {
    const query = this.searchForm.get('fournisseurId')?.value;
    if (query) {
      this.fournisseurService.searchSuppliers(query).subscribe(
        (fournisseurs: Fournisseur[]) => {
          this.fournisseurs = fournisseurs;
        },
        (error) => {
          console.error('Erreur lors de la recherche de fournisseurs : ', error);
          this.showAlert('Erreur lors de la recherche de fournisseurs', 'danger');
        }
      );
    } else {
      this.fournisseurService.getSuppliers().subscribe(
        (fournisseurs: Fournisseur[]) => {
          this.fournisseurs = fournisseurs;
        },
        (error) => {
          console.error('Erreur lors de la récupération des fournisseurs : ', error);
          this.showAlert('Erreur lors de la récupération des fournisseurs', 'danger');
        }
      );
    }
  }
  
  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'en appuyant sur ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'en cliquant en dehors';
    } else {
      return `avec: ${reason}`;
    }
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;

    setTimeout(() => {
      this.alertMessage = null;
      this.alertType = null;
    }, 3000);
  }
}
