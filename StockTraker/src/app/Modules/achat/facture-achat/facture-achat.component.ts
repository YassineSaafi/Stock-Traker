import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FactureAchatService } from '../facture-achat.service';
import { fournisseurService } from '../../fournisseur/fournisseur.service'; // Assurez-vous de la casse correcte

@Component({
  selector: 'app-facture-achat',
  templateUrl: './facture-achat.component.html',
  styleUrls: ['./facture-achat.component.scss']
})
export class FactureAchatComponent implements OnInit {
  factureAchatForm!: FormGroup;
  fournisseurs: any[] = [];

  constructor(
    private fb: FormBuilder,
    private factureAchatService: FactureAchatService,
    private fournisseurService: fournisseurService // Assurez-vous de la casse correcte
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getFournisseurs();
  }

  createForm() {
    this.factureAchatForm = this.fb.group({
      reference: ['', Validators.required],
      fournisseur: ['', Validators.required],
      date: ['', Validators.required],
      copie: [null], // Géré par l'upload de fichier
      montant: ['', Validators.required],
    });
  }

  getFournisseurs() {
    this.fournisseurService.getSuppliers().subscribe(
      (data: any[]) => {
        this.fournisseurs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des fournisseurs:', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('reference', this.factureAchatForm.get('reference')?.value ?? '');
    formData.append('fournisseur', this.factureAchatForm.get('fournisseur')?.value ?? '');
    formData.append('date', this.factureAchatForm.get('date')?.value ?? '');
    formData.append('copie', (this.factureAchatForm.get('copie')?.value as File) ?? '');
    formData.append('montant', this.factureAchatForm.get('montant')?.value ?? '');

    this.factureAchatService.addFactureAchat(formData).subscribe(
      (res) => {
        console.log('Facture d\'achat ajoutée avec succès:', res);
        this.factureAchatForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la facture d\'achat:', error);
      }
    );
  }
}
