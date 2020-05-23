import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<any>;
  constructor(private productSv: ProductService, private router: Router) {}

  ngOnInit() {
    this.products$ = this.productSv.getAll();
  }

  toEditPage(id: string) {
    this.router.navigate(['admin/products', id]);
  }
}
