import { Component, OnInit } from '@angular/core';
import { FactureService } from '../facture.service';
import { Facture } from '../facture';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.scss']
})
export class StatistiqueComponent implements OnInit {
  chartData: any[] = [];
  chartOptions: any;
  chartColumns: string[] = ['Month', 'Sales'];
  chartType: ChartType = ChartType.ColumnChart;

  products: { id: string, nom: string }[] = []; // Liste des produits
  selectedProduct: string = ''; // Produit sélectionné
  allFactures: Facture[] = []; // Toutes les factures

  constructor(private FactureService: FactureService) {}

  ngOnInit(): void {
    this.FactureService.getFactures().subscribe((data: Facture[]) => {
      this.allFactures = data;
      this.extractProducts(data);
    });
  }

  extractProducts(factures: Facture[]): void {
    const productSet = new Set<{ id: string, nom: string }>();

    factures.forEach(facture => {
      facture.produits.forEach(produit => {
        productSet.add({ id: produit.idProduit, nom: produit.nom });
      });
    });

    this.products = Array.from(productSet);
  }

  onProductChange(): void {
    this.processData();
  }

  processData(): void {
    const salesByMonth: { [key: string]: number } = {};

    this.allFactures.forEach(facture => {
      facture.produits.forEach(produit => {
        if (produit.idProduit === this.selectedProduct) {
          const month = new Date(facture.date).toLocaleString('default', { month: 'long', year: 'numeric' });

          if (!salesByMonth[month]) {
            salesByMonth[month] = 0;
          }
          salesByMonth[month] += produit.qte;
        }
      });
    });

    this.chartData = Object.keys(salesByMonth).map(month => [month, salesByMonth[month]]);

    this.chartOptions = {
      title: 'Sales per Month',
      hAxis: { title: 'Month' },
      vAxis: { title: 'Number of Sales' },
      legend: 'none'
    };
  }
}
