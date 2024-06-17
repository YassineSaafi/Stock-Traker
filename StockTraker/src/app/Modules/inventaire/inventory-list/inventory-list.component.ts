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
  groupedInventories: { [key: string]: Product[] } = {};

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
    const categorySet = new Set<string>();
    this.products.forEach(product => {
      if (product.categorieNom) {
        categorySet.add(product.categorieNom);
      }
    });
    this.categories = Array.from(categorySet);
  }

  filterProductsByCategories(): void {
    if (this.selectedCategories.length > 0) {
      this.filteredProducts = this.products.filter(product =>
        product.categorieNom && this.selectedCategories.includes(product.categorieNom)
      );
    } else {
      this.filteredProducts = this.products; // Show all products if no category is selected
    }
    this.groupProductsByCategory();
  }

  groupProductsByCategory(): void {
    if (this.filteredProducts.length > 0) {
      this.groupedInventories = this.filteredProducts.reduce<{ [key: string]: Product[] }>((acc, product) => {
        if (product.categorieNom) {
          if (!acc[product.categorieNom]) {
            acc[product.categorieNom] = [];
          }
          acc[product.categorieNom].push(product); // Corrected to use categorieNom
        }
        return acc;
      }, {});
    } else {
      this.groupedInventories = {};
    }
  }

  saveInventory(): void {
    const today = new Date();
    this.filteredProducts.forEach((product: Product) => {
      const inventoryItem: Inventory = {
        productName: product.nom,
        SKU: product.ref,
        category: product.categorieNom!, // Corrected to remove !
        quantity: product.qte,
        unitPrice: product.prix,
        receptionDate: today,
        lastUpdate: today,
        status: 'Available' // Adjust this field as needed
      };
      this.inventoryService.createItem(inventoryItem).subscribe();
    });
  }

  printInventory(): void {
    window.print();
    console.log('Printing inventory...');
  }
}
