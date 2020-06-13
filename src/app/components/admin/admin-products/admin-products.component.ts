import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable, Subscription } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

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
      .subscribe(() => this.loadingSv.off());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toEditPage(id: string) {
    this.router.navigate(['admin/products', id]);
  }
}
