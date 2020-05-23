import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private afs: AngularFirestore) {}

  async create(product: Product) {
    try {
      await this.afs.collection('products').add(product);
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: string, product: Product) {
    try {
      await this.afs.collection('products').doc(id).update(product);
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
}
