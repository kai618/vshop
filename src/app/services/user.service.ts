import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  async save(user: firebase.User) {
    const doc = this.afs.collection('users').doc(user.uid);
    try {
      const snapshot = await doc.get().toPromise();

      if (snapshot.exists)
        doc.update({
          name: user.displayName,
          email: user.email,
          lastTime: Date.now(),
        });
      else
        doc.set({
          name: user.displayName,
          email: user.email,
          firstTime: Date.now(),
          lastTime: Date.now(),
        });
    } catch (error) {
      console.error(error);
    }
  }

  getRoles(uid: string) {
    try {
      return this.afs
        .collection('roles', (ref) => ref.where(uid, '==', true))
        .snapshotChanges()
        .pipe(map((actions) => actions.map((a) => a.payload.doc.id)));
    } catch (error) {
      console.error(error);
    }
  }
}
