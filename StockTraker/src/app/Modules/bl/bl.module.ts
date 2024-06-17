import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonDeLivraisonComponent } from './bl/bl.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BonDeLivraisonComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule ,
    NgbModule
  ]
})
export class BLModule { }
