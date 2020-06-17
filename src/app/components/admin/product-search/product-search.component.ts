import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AmountType } from 'src/app/interfaces/amount-type';
import { Router } from '@angular/router';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { Filter } from 'src/app/interfaces/filter';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit {
  products: any[];

  categories: string[];
  amountType: AmountType = AmountType.All;
  keyword: string;

  priceEnabled: boolean = false;
  min: number = 0;
  max: number = 100;

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
    this.products = await this.productSv.search(<Filter>{
      categories: this.categories,
      amountType: this.amountType,
      keyword: this.keyword,
      price: this.priceEnabled ? [this.min, this.max] : null,
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

  onMinChange(val: string) {
    this.min = Number(val);
    if (this.max < this.min) this.max = this.min;
  }

  onMaxChange(val: string) {
    this.max = Number(val);
    if (this.min > this.max) this.min = this.max;
  }
}
