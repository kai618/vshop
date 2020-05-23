import { Component, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @ViewChild('form') form: NgForm;
  categories$: any;
  isPhotoUrlValid: boolean = true;

  constructor(
    private router: Router,
    private catSv: CategoryService,
    private productSv: ProductService
  ) {
    this.categories$ = catSv.getCategories();
  }

  onCardPhotoError(element: HTMLImageElement) {
    this.isPhotoUrlValid = false;
    element.src = '../../../../assets/no-photo.png';
  }

  async submit() {
    await this.productSv.create(this.form.value);
    this.router.navigate(['/admin/products']);
  }
}
