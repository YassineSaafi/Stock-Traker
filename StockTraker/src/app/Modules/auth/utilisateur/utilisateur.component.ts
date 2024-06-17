import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';  // Assurez-vous d'ajuster le chemin si nécessaire
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';  // Utilisation de NgbModal pour les modales Bootstrap

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs: any[] = []; // Tableau pour stocker la liste des utilisateurs
  utilisateurSelectionne: any = null; // Utilisateur sélectionné pour modification de rôle ou suppression
  roleForm: FormGroup; // Form groupe pour le formulaire de modification de rôle

  constructor(
    private authService: AuthService,
    private modalService: NgbModal, // Injecter NgbModal pour ouvrir les modales
    private formBuilder: FormBuilder
  ) {
    this.roleForm = this.formBuilder.group({
      newRole: ['']
    });
  }

  ngOnInit(): void {
    this.fetchUtilisateurs();
  }

  fetchUtilisateurs(): void {
    this.authService.getUsers().subscribe(
      (utilisateurs) => {
        this.utilisateurs = utilisateurs;
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    );
  }

  ouvrirModal(modalContent: any, utilisateur: any): void {
    this.utilisateurSelectionne = utilisateur;
    this.modalService.open(modalContent, { centered: true });
  }

  onSubmitModifierRole(): void {
    if (this.utilisateurSelectionne && this.roleForm.valid) {
      const userId = this.utilisateurSelectionne._id;
      const newRole = this.roleForm.value.newRole;
      this.authService.modifierRole(userId, newRole).subscribe(
        () => {
          console.log('Rôle modifié avec succès');
          this.modalService.dismissAll(); // Fermer la modal après succès
          this.fetchUtilisateurs(); // Rafraîchir la liste des utilisateurs
        },
        (error) => {
          console.error('Erreur lors de la modification du rôle', error);
        }
      );
    }
  }

  supprimerUtilisateur(): void {
    if (this.utilisateurSelectionne) {
      const userId = this.utilisateurSelectionne._id;
      this.authService.supprimerUtilisateur(userId).subscribe(
        () => {
          console.log('Utilisateur supprimé avec succès');
          this.modalService.dismissAll(); // Fermer la modal après succès
          this.fetchUtilisateurs(); // Rafraîchir la liste des utilisateurs
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'utilisateur', error);
        }
      );
    }
  }

}
