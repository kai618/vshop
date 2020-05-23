import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss'],
})
export class UpdateProductFormComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  categories$: any;
  isPhotoUrlValid: boolean = true;
  product: Product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catSv: CategoryService,
    private productSv: ProductService
  ) {}

  ngOnInit() {
    this.categories$ = this.catSv.getCategories();

    const id = this.route.snapshot.paramMap.get('id');
    this.productSv
      .get(id)
      .pipe(take(1))
      .subscribe((p) => (this.product = p));
  }

  onCardPhotoError(element: HTMLImageElement) {
    this.isPhotoUrlValid = false;
    element.src = '../../../../assets/no-photo.png';
  }

  submit() {
    console.log(this.product);
  }
}
