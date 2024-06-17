import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { Inventory } from '../inventory';
import { Product } from '../../produit/produit';
import { ProductService } from '../../produit/produit.service';

@Component({
  selector: 'app-category-inventory',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class CategoryInventoryComponent implements OnInit {
  categories: string[] = [];
  products: Product[] = [];
  selectedCategories: string[] = [];
  filteredProducts: Product[] = [];

  constructor(private productService: ProductService, private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      this.loadCategories();
      this.filterProductsByCategories(); // Initial call to display all products
    });
  }

  loadCategories(): void {
    const categorySet = new Set(this.products.map(product => product.categorie));
    this.categories = Array.from(categorySet);
  }

  filterProductsByCategories(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredProducts = this.products.filter(product =>
        this.selectedCategories.includes(product.categorie)
      );
    } else {
      this.filteredProducts = this.products;
    }
  }

  saveInventory(): void {
    const today = new Date();
    this.filteredProducts.forEach(product => {
      const inventoryItem: Inventory = {
        productName: product.nom,
        SKU: product.ref,
        category: product.categorie,
        quantity: product.qte,
        unitPrice: product.prix,
        receptionDate: today,
        lastUpdate: today,
        status: 'Available' // Vous pouvez ajuster ce champ selon vos besoins
      };
      this.inventoryService.createItem(inventoryItem).subscribe();
    });
  }
}
