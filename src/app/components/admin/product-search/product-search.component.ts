import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { AmountType } from 'src/app/interfaces/amount-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  categories: string[];
  products: any[];

  constructor(
    private afs: AngularFirestore,
    private productSv: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSelectCats(data: string[]) {
    this.categories = data;
  }

  async search() {
    this.products = await this.afs
      .collection('products', (ref) =>
        ref.where('category', 'in', this.categories)
      )
      .valueChanges({ idField: 'id' })
      .pipe(take(1))
      .toPromise();
  }

  getAmountClass(amount: number): Object {
    const type = this.productSv.getAmountType(amount);
    if (type == AmountType.NearlyOutOfStock) return { 'table-warning': true };
    if (type == AmountType.OutOfStock) return { 'table-danger': true };
    return {};
  }

  toEditPage(id: string) {
    this.router.navigate(['admin/products', id]);
  }
}
