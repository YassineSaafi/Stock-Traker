import { Component, OnInit } from '@angular/core';
import {FactureService} from '../../facture/facture.service'
import {Facture} from '../../facture/facture'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  totalSalesToday: number = 0;
  totalClients: number = 0;
  totalPurchases: number = 0;
  today: string = new Date().toISOString().split('T')[0];

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.fetchTotalSalesToday();
    this.fetchTotalClients();
    this.fetchTotalPurchases();
  }

  fetchTotalSalesToday(): void {
    this.factureService.getFacturesByDate(this.today).subscribe((factures: Facture[]) => {
      this.totalSalesToday = factures.reduce((acc, facture) => acc + facture.somme, 0);
    });
  }

  fetchTotalClients(): void {
    this.factureService.getClients().subscribe(clients => {
      this.totalClients = clients.length;
    });
  }

  fetchTotalPurchases(): void {
    this.factureService.getAllFactures().subscribe((factures: Facture[]) => {
      this.totalPurchases = factures.length;
    });
  }
}