import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'src/app/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-product-form',
  templateUrl: './update-product-form.component.html',
  styleUrls: ['./update-product-form.component.scss'],
})
export class UpdateProductFormComponent implements OnInit, OnDestroy {
  private noPhotoURL: string;
  isPhotoUrlValid = true;
  sameData = true;

  categories$: any;
  private id: string;
  oldProduct: Product = {};

  form: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    category: [null, [Validators.required]],
    price: [null, [Validators.required, Validators.min(0)]],
    amount: [null, [Validators.required, Validators.min(0)]],
    photoURL: [
      null,
      [Validators.required, Validators.pattern(Constants.urlRegex)],
    ],
  });

  valueChangesSub: Subscription;

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

    this.setOnValueChanges();

    this.productSv
      .get(this.id)
      .pipe(take(1))
      .subscribe((p) => {
        this.oldProduct = p;
        this.loadingSv.off();
        this.setFormValue();
      });
  }

  ngOnDestroy() {
    if (this.valueChangesSub) this.valueChangesSub.unsubscribe();
  }

  setOnValueChanges() {
    this.valueChangesSub = this.form.valueChanges.subscribe((data) => {
      if (
        data['title'] !== this.oldProduct.title ||
        data['price'] !== this.oldProduct.price ||
        data['amount'] !== this.oldProduct.amount ||
        data['category'] !== this.oldProduct.category ||
        data['photoURL'] !== this.oldProduct.photoURL
      )
        this.sameData = false;
      else this.sameData = true;
    });
  }

  setFormValue() {
    this.form.setValue({
      title: this.oldProduct.title,
      category: this.oldProduct.category,
      price: this.oldProduct.price,
      amount: this.oldProduct.amount,
      photoURL: this.oldProduct.photoURL,
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
      this.form.value as Product,
      this.oldProduct.category
    );
    this.loadingSv.off();
    this.toProductsPage();
  }

  async remove() {
    this.loadingSv.on();
    await this.productSv.remove(this.id, this.oldProduct.category);
    this.loadingSv.off();
    this.toProductsPage();
  }

  openModal(content: any) {
    this.modalSv.open(content, { centered: true }).result.then(
      (val) => {
        if (val) this.remove();
      },
      () => {}
    );
  }

  toProductsPage() {
    this.router.navigate(['/admin']);
  }
}
