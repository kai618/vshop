import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/interfaces/product';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

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
  private id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catSv: CategoryService,
    private productSv: ProductService,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit() {
    this.categories$ = this.catSv.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    this.productSv
      .get(this.id)
      .pipe(take(1))
      .subscribe((p) => (this.product = p));
  }

  onCardPhotoError(element: HTMLImageElement) {
    element.src = '../../../../assets/no-photo.png';
    this.isPhotoUrlValid = false;
  }

  async submit() {
    this.loadingSv.on();
    await this.productSv.update(this.id, this.product);
    this.loadingSv.off();
    this.router.navigate(['/admin/products']);
  }

  delete() {}
}
