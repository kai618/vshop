import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { AmountType } from 'src/app/interfaces/amount-type';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  private subscription: Subscription;

  constructor(
    private productSv: ProductService,
    private router: Router,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit() {
    this.loadingSv.on();
    this.subscription = this.productSv
      .getAll()
      .subscribe((data) => (this.products = data));

    // FIXME: find another way to hook a callback on the first emission
    this.productSv
      .getAll()
      .pipe(take(1))
      .toPromise()
      .then(() => this.loadingSv.off());
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  toEditPage(id: string) {
    this.router.navigate(['admin/products', id]);
  }

  getAmountClass(amount: number): Object {
    const type = this.productSv.getAmountType(amount);
    if (type == AmountType.NearlyOutOfStock) return { 'table-warning': true };
    if (type == AmountType.OutOfStock) return { 'table-danger': true };
    return {};
  }
}
