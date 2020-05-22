import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore) {}

  async create(product: Product) {
    try {
      console.log(product);
      await this.afs.collection('products').add(product);
    } catch (error) {
      console.error(error);
    }
  }
}
