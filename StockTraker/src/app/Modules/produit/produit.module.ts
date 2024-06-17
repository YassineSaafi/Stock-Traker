import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProduitComponent } from './produit/produit.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';

import { CategoryComponent } from './category/category.component';



@NgModule({
  declarations: [ProduitComponent, CategoryComponent],
  imports: [
    CommonModule ,
    FormsModule ,
    ReactiveFormsModule
  ]
})
export class ProduitModule { }
