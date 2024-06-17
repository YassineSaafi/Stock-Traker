import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BonReceptionComponent } from './bon-reception/bon-reception.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [BonReceptionComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule 
  ]
})
export class BonReceptionModule { }
