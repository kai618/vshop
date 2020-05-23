import { Component, ViewChild, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.scss'],
})
export class NewProductFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  categories$: any;
  isPhotoUrlValid: boolean = true;

  constructor(
    private router: Router,
    private catSv: CategoryService,
    private productSv: ProductService,
    private loadingSv: LoadingBarService
  ) {}
  ngOnInit() {
    this.categories$ = this.catSv.getCategories();
  }

  onCardPhotoError(element: HTMLImageElement) {
    this.isPhotoUrlValid = false;
    element.src = '../../../../assets/no-photo.png';
  }

  async submit() {
    this.loadingSv.on();
    await this.productSv.create(this.form.value);
    this.loadingSv.off();
    this.router.navigate(['/admin/products']);
  }
}
