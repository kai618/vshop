import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AmountType } from '../interfaces/amount-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore) {}

  getAmountType(amount: number): AmountType {
    if (amount >= 20) return AmountType.InStock;
    if (amount >= 1) return AmountType.NearlyOutOfStock;
    return AmountType.OutOfStock;
  }

  async create(product: Product) {
    try {
      const createProduct = this.afs.collection('products').add(product);
      const incrementCat = this.afs
        .collection('categories')
        .doc(product.category)
        .update({ total: firebase.firestore.FieldValue.increment(1) });

      await Promise.all([createProduct, incrementCat]);
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, product: Product, oldCat: string) {
    try {
      const updateProduct = this.afs
        .collection('products')
        .doc(id)
        .update(product);

      if (product.category === oldCat) await updateProduct;
      else {
        const decrementCat = this.afs
          .collection('categories')
          .doc(oldCat)
          .update({ total: firebase.firestore.FieldValue.increment(-1) });

        const incrementCat = this.afs
          .collection('categories')
          .doc(product.category)
          .update({ total: firebase.firestore.FieldValue.increment(1) });

        await Promise.all([updateProduct, decrementCat, incrementCat]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  getAll(): Observable<any> {
    try {
      const products$ = this.afs
        .collection('products', (ref) => ref.orderBy('createDate', 'desc'))
        .valueChanges({ idField: 'id' });
      return products$;
    } catch (error) {
      console.error(error);
    }
  }

  get(id: string): Observable<Product> {
    try {
      const product$ = this.afs
        .collection('products')
        .doc(id)
        .valueChanges()
        .pipe(
          map(
            (p) =>
              <Product>{
                title: p['title'],
                price: p['price'],
                amount: p['amount'],
                category: p['category'],
                photoURL: p['photoURL'],
                createDate: p['createDate'],
              }
          )
        );
      return product$;
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: string, cat: string) {
    try {
      const deleteProduct = this.afs.collection('products').doc(id).delete();
      const decrementCat = this.afs
        .collection('categories')
        .doc(cat)
        .update({ total: firebase.firestore.FieldValue.increment(-1) });

      await Promise.all([deleteProduct, decrementCat]);
    } catch (error) {
      console.log(error);
    }
  }
}


