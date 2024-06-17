import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChequeService } from '../cheque.service';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {
  chequeForm!: FormGroup;
  clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private chequeService: ChequeService,
    private clientService: ClientService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getClients();
  }

  createForm() {
    this.chequeForm = this.fb.group({
      numboedereau: ['', Validators.required],
      client: ['', Validators.required],
      date: ['', Validators.required],
      copie: [null], // Managed by file upload
      banque: ['', Validators.required],
      montant: ['', Validators.required],
      etat: ['nonversé', Validators.required]
    });
  }

  getClients() {
    this.clientService.getClients().subscribe(
      (data: any[]) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error retrieving clients:', error);
      }
    );
  }

 onSubmit() {
    const formData = new FormData();
    formData.append('numboedereau', this.chequeForm.get('numboedereau')?.value ?? '');
    formData.append('client', this.chequeForm.get('client')?.value ?? '');
    formData.append('date', this.chequeForm.get('date')?.value ?? '');
    const copieFile = this.chequeForm.get('copie')?.value;
    if (copieFile) {
        formData.append('copie', copieFile);
    }
    formData.append('banque', this.chequeForm.get('banque')?.value ?? '');
    formData.append('montant', this.chequeForm.get('montant')?.value ?? '');
    formData.append('etat', this.chequeForm.get('etat')?.value ?? '');

    this.chequeService.addCheque(formData).subscribe(
        (res) => {
            console.log('Chèque ajouté avec succès:', res);
            this.chequeForm.reset();
        },
        (error) => {
            console.error('Erreur lors de l\'ajout du chèque:', error);
        }
    );
}


}
