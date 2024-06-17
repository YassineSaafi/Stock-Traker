import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  clientForm: FormGroup;
  searchForm: FormGroup;
  editingClient: Client | null = null;
  closeResult = '';
  alertMessage: string | null = null;
  alertType: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) {
    this.clientForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      matricule: ['']
    });

    this.searchForm = this.fb.group({
      clientId: ['']
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((data: Client[]) => {
      this.clients = data;
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.editingClient) {
        this.clientService.updateClient(this.editingClient._id!, this.clientForm.value).subscribe(() => {
          this.loadClients();
          this.editingClient = null;
          this.clientForm.reset();
          this.openSnackBar('Client mis à jour avec succès', 'Fermer');
        });
      } else {
        this.clientService.createClient(this.clientForm.value).subscribe(() => {
          this.loadClients();
          this.clientForm.reset();
          this.openSnackBar('Client ajouté avec succès', 'Fermer');
        });
      }
    }
  }

  onEdit(client: Client): void {
    this.editingClient = client;
    this.clientForm.patchValue(client);
  }

  onDelete(clientId: string | undefined): void {
    if (clientId) {
      this.clientService.deleteClient(clientId).subscribe(
        () => {
          this.loadClients();
          this.openSnackBar('Client supprimé avec succès', 'Fermer');
        },
        (error) => {
          console.error('Erreur lors de la suppression du client : ', error);
          this.showAlert('Erreur lors de la suppression du client', 'danger');
        }
      );
    } else {
      console.error('ID du client non valide : ', clientId);
      this.showAlert('ID du client non valide', 'danger');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openModal(content: any): void {
    this.clientForm.reset();
    this.editingClient = null;
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
    const clientId = this.searchForm.get('clientId')?.value;
    if (clientId) {
      this.clientService.getClientById(clientId).subscribe((client: Client) => {
        this.clients = client ? [client] : [];
      });
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
