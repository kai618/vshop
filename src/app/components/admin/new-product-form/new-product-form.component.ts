import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
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
  private urlRegex =
    '^((https?|ftp|smtp)://)(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#-]+/?)*$';
  categories$: any;
  isPhotoUrlValid: boolean = true;
  form = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    amount: ['', [Validators.required, Validators.min(0)]],
    photoURL: ['', [Validators.required, Validators.pattern(this.urlRegex)]],
  });

  constructor(
    private router: Router,
    private catSv: CategoryService,
    private productSv: ProductService,
    private loadingSv: LoadingBarService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {
    this.categories$ = this.catSv.getCategories();
  }

  onCardPhotoError(element: HTMLImageElement) {
    this.isPhotoUrlValid = false;
    element.src = '../../../../assets/no-photo.png';
  }

  async submit() {
    console.log(this.form.valid);
    // this.loadingSv.on();
    // const val = this.form.value;
    // await this.productSv.create(<Product>{
    //   title: val.title,
    //   category: val.category,
    //   photoURL: val.photoURL,
    //   price: val.price,
    //   amount: val.amount,
    //   createDate: Date.now(),
    // });
    // this.loadingSv.off();
    // this.router.navigate(['/admin/products']);
  }
}

function validPhotoUrlValidator(): ValidatorFn {
  const regexURL = new RegExp(
    '^((https?|ftp|smtp)://)(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#-]+/?)*$'
  );
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const valid = regexURL.test(control.value);
    return valid ? { validURL: true } : null;
  };
}
