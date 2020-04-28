import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  categories$: any;

  constructor(categorySv: CategoryService) {
    this.categories$ = categorySv.getCategories();
  }

  ngOnInit(): void {}
}
