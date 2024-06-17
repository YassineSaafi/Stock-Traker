import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FournisseurComponent } from './fournisseur/fournisseur.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FournisseurComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule
  ]
})
export class FournisseurModule { }
