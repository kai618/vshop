import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AmountType } from 'src/app/interfaces/amount-type';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  categories: string[];
  amountType: AmountType = AmountType.All;
  products: any[];

  constructor(
    private productSv: ProductService,
    private router: Router,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit(): void {}

  onSelectCats(data: string[]) {
    this.categories = data;
  }

  async search() {
    this.loadingSv.on();
    this.products = await this.productSv.search({
      cat: this.categories,
      amount: this.amountType,
    });
    this.loadingSv.off();
  }

  onSelectAmountType(data: string) {
    this.amountType = AmountType[data];
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
