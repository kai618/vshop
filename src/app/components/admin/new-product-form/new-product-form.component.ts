import { Component, ViewChild, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { Product } from 'src/app/interfaces/product';

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
    const val = this.form.value;
    await this.productSv.create(<Product>{
      title: val.title,
      category: val.category,
      photoURL: val.photoURL,
      price: val.price,
      amount: val.amount,
      createDate: Date.now(),
    });
    this.loadingSv.off();
    this.router.navigate(['/admin/products']);
  }
}
