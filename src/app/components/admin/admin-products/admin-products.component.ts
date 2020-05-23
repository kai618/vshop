import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent {
  products$: Observable<any>;
  constructor(private productSv: ProductService) {
    this.products$ = productSv.getAll();
  }
}
