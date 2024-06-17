import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactureAchatComponent } from './facture-achat/facture-achat.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AchatComponent } from './achat/achat.component';



@NgModule({
  declarations: [FactureAchatComponent, AchatComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule
  ]
})
export class AchatModule { }
