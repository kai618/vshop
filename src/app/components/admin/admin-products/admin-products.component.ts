import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<any>;

  constructor(
    private productSv: ProductService,
    private router: Router,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit() {
    this.loadingSv.on();
    this.products$ = this.productSv.getAll();
    this.products$.pipe(take(1)).subscribe(() => this.loadingSv.off());
  }

  toEditPage(id: string) {
    this.router.navigate(['admin/products', id]);
  }
}
