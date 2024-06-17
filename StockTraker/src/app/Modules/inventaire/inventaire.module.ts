import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryListComponent} from './inventory/inventory.component';
import { CategoryInventoryComponent } from './inventory-list/inventory-list.component';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [InventoryListComponent,  CategoryInventoryComponent],
  imports: [
    CommonModule ,
    FormsModule ,
    MatSelectModule
  ]
})
export class InventaireModule { }
