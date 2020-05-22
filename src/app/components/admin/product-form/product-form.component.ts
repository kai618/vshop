import { Component, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @ViewChild('form') form: NgForm;
  categories$: any;

  constructor(
    private catSv: CategoryService,
    private productSv: ProductService
  ) {
    this.categories$ = catSv.getCategories();
  }

  async submit() {
    await this.productSv.create(this.form.value);
  }
}
