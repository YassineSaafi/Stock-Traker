import { Component, OnInit } from '@angular/core';
import { FactureAchatService } from '../facture-achat.service'


@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.scss']
})
export class AchatComponent implements OnInit {

  facturesAchat: any[] = [];

  constructor(private factureAchatService: FactureAchatService) { }

  ngOnInit(): void {
    this.loadFacturesAchat();
  }

  loadFacturesAchat(): void {
    this.factureAchatService.getFacturesAchat().subscribe(
      data => {
        this.facturesAchat = data;
      },
      error => {
        console.error('Error fetching factures d\'achat', error);
      }
    );
  }
}