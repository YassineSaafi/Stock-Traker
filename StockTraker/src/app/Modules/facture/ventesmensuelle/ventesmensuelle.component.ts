import { Component, OnInit } from '@angular/core';
import { VentesService } from '../ventesmensuelle.service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-ventes-mensuelles',
  templateUrl: './ventesmensuelle.component.html',
  styleUrls: ['./ventesmensuelle.component.scss']
})
export class VentesMensuellesComponent implements OnInit {
  clientId = 'client-id'; // Remplacez par le clientId réel
  year = 2024; // Année actuelle
  month = 6; // Mois actuel (juin)
  totalVentes: number = 0; // Initialiser totalVentes

  public chartData: any[] = [
    ['Client', 'Ventes'] // Entêtes initiales
  ];
  public chartOptions = {
    title: 'Ventes mensuelles',
    hAxis: { title: 'Client' },
    vAxis: { title: 'Ventes' },
    legend: 'none'
  };
  public chartType: ChartType = ChartType.ColumnChart;

  constructor(private ventesService: VentesService) { }

  ngOnInit(): void {
    this.ventesService.getVentesMensuelles(this.clientId, this.year, this.month).subscribe(
      (data: any) => {
        this.totalVentes = data.totalVentes || 0; // Vérifiez si data.totalVentes existe
        // Format des données pour Google Charts
        this.chartData = [
          ['Client', 'Ventes'], // Entêtes
          [this.clientId, this.totalVentes] // Données
        ];
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des ventes mensuelles', error);
      }
    );
  }
}