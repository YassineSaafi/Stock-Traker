import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChequeComponent } from './cheque/cheque.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChequeComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ChequeModule { }
