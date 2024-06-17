import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureComponent } from './facture/facture.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { VenteComponent } from './vente/vente.component';
import { StatistiqueComponent } from './statistique/statistique.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { VentesMensuellesComponent } from './ventesmensuelle/ventesmensuelle.component';


@NgModule({
  declarations: [FactureComponent, VenteComponent, StatistiqueComponent, VentesMensuellesComponent],
  imports: [
    CommonModule ,
    FormsModule, 
    ReactiveFormsModule ,
    GoogleChartsModule ,
   
  ]
})
export class FactureModule { }
