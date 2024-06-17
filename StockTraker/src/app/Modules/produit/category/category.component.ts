import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service'; // Ajustez le chemin en fonction de votre structure de dossiers
import { Category } from '../category'; // Ajustez le chemin en fonction de votre structure de dossiers

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  categoryForm: FormGroup;
  editingCategory: Category | null = null;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.categoryForm.valid) {
      if (this.editingCategory) {
        this.categoryService.updateCategory(this.editingCategory.name, this.categoryForm.value).subscribe(() => {
          this.loadCategories();
          this.editingCategory = null;
          this.categoryForm.reset();
          this.formSubmitted = false;
        });
      } else {
        this.categoryService.addCategory(this.categoryForm.value).subscribe(() => {
          this.loadCategories();
          this.categoryForm.reset();
          this.formSubmitted = false;
        });
      }
    }
  }

  onEdit(category: Category): void {
    this.editingCategory = category;
    this.categoryForm.patchValue(category);
  }

  onDelete(id: string): void {
    this.categoryService.deleteCategory(id).subscribe(() => {
      this.loadCategories();
    });
  }
}
