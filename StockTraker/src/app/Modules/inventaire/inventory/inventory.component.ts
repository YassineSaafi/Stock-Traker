import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryListComponent implements OnInit {
  inventories: Inventory[] = [];

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventories();
  }

  loadInventories(): void {
    this.inventoryService.getInventories().subscribe(data => {
      this.inventories = data;
    });
  }

  printInventory(inventory: Inventory): void {
    const printContents = `
      <div>
        <h2>Inventaire</h2>
        <p><strong>Référence:</strong> ${inventory.SKU}</p>
        <p><strong>Nom du produit:</strong> ${inventory.productName}</p>
        <p><strong>Catégorie:</strong> ${inventory.category}</p>
        <p><strong>Quantité:</strong> ${inventory.quantity}</p>
        <p><strong>Prix unitaire:</strong> ${inventory.unitPrice}</p>
        <p><strong>Date de réception:</strong> ${new Date(inventory.receptionDate).toLocaleDateString()}</p>
      </div>
    `;

    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Imprimer l'inventaire</title>
          </head>
          <body onload="window.print();window.close()">
            ${printContents}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }
}
