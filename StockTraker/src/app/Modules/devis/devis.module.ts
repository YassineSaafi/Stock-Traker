import { NgModule } from '@angular/core';
import { CommonModule ,DatePipe } from '@angular/common';
import { DevisComponent } from './devis/devis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DevisComponent],
  imports: [
    CommonModule ,
    FormsModule, 
    ReactiveFormsModule ,
    
  ],
  providers: [DatePipe]
})
export class DevisModule { }
