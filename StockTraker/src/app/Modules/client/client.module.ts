import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client/client.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule ,
    ReactiveFormsModule ,
    FormsModule
  ]
})
export class ClientModule { }
