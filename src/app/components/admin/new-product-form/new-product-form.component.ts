import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormBuilder, Validators } from '@angular/forms';
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
  private noPhotoURL: string;
  private urlRegex = `^((https|http|ftp|smtp):\/\/)(www.)?([a-z0-9]+\.)*[a-z]+(\/[a-zA-Z0-9#=?_\\-\.]+\/?)*$`;
  categories$: any;
  isPhotoUrlValid: boolean = false;

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

  onLoadPhoto(element: HTMLImageElement) {
    if (element.src === this.noPhotoURL) return;
    this.isPhotoUrlValid = true;
  }

  onErrorPhoto(element: HTMLImageElement) {
    element.src = '../../../../assets/no-photo.png';
    this.noPhotoURL = element.src;
  }

  async submit() {
    if (this.form.invalid || !this.isPhotoUrlValid) return;
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

// function validPhotoUrlValidator(): ValidatorFn {
//   const regexURL = new RegExp(
//     '^((https?|ftp|smtp)://)(www.)?[a-z0-9]+.[a-z]+(/[a-zA-Z0-9#-]+/?)*$'
//   );
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const valid = regexURL.test(control.value);
//     return valid ? { validURL: true } : null;
//   };
// }
