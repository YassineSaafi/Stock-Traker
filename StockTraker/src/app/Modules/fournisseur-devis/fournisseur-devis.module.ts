import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurDevisComponent } from './fournisseur-devis/fournisseur-devis.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FournisseurDevisComponent],
  imports: [
    CommonModule ,
    FormsModule
  ]
})
export class FournisseurDevisModule { }
