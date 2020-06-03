import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'firebase';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss'],
})
export class UpdateProductFormComponent implements OnInit {
  private noPhotoURL: string;
  isPhotoUrlValid: boolean = true;

  categories$: any;
  oldProduct: Product;
  product: Product = {};
  private id: string;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    amount: ['', [Validators.required, Validators.min(0)]],
    photoURL: [
      '',
      [Validators.required, Validators.pattern(Constants.urlRegex)],
    ],
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catSv: CategoryService,
    private productSv: ProductService,
    private loadingSv: LoadingBarService,
    private modalSv: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loadingSv.on();
    this.categories$ = this.catSv.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    this.productSv
      .get(this.id)
      .pipe(take(1))
      .subscribe((p) => {
        this.oldProduct = p;
        this.product = p;
        this.loadingSv.off();
        this.setFormValue();
      });
  }

  setFormValue() {
    this.form.setValue({
      title: this.product.title,
      category: this.product.category,
      price: this.product.price,
      amount: this.product.amount,
      photoURL: this.product.photoURL,
    });
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
    this.loadingSv.on();
    await this.productSv.update(
      this.id,
      this.product,
      this.oldProduct.category
    );
    this.loadingSv.off();
    this.toProductsPage();
  }

  async remove() {
    this.loadingSv.on();
    await this.productSv.remove(this.id, this.product.category);
    this.loadingSv.off();
    this.toProductsPage();
  }

  openModal(content: any) {
    this.modalSv.open(content).result.then(
      (val) => {
        if (val) this.remove();
      },
      () => {}
    );
  }

  toProductsPage() {
    this.router.navigate(['/admin/products']);
  }
}
