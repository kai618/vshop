import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private afs: AngularFirestore) {}

  getCategories() {
    const data = this.afs
      .collection('categories')
      .valueChanges({ idField: 'id' });
    return data;
  }
}
