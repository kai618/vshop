import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map } from 'rxjs/operators';
import { Observable, zip, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User;

  constructor(private afs: AngularFirestore) {}

  toUser(fbUser: firebase.User): User {
    if (fbUser == null) return null;
    return <User>{
      uid: fbUser.uid,
      email: fbUser.email,
      displayName:
        fbUser.displayName ?? this.capitalise(fbUser.email.split('@')[0]),
      photoURL: fbUser.photoURL,
    };
  }

  async storeInFirestore(user: firebase.User) {
    const doc = this.afs.collection('users').doc(user.uid);
    try {
      const snapshot = await doc.get().toPromise();

      if (snapshot.exists)
        doc.update({
          name: user.displayName,
          email: user.email,
          lastTime: Date.now(),
        });
      else {
        const firstTime = Date.now();
        doc.set({
          name: user.displayName,
          email: user.email,
          firstTime: firstTime,
          lastTime: firstTime,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  getRoles(uid: string): Observable<string[]> {
    const isAdmin = this.afs
      .collection('roles')
      .doc('admin')
      .collection('role-users')
      .doc(uid)
      .valueChanges();

    const isManager = this.afs
      .collection('roles')
      .doc('manager')
      .collection('role-users')
      .doc(uid)
      .valueChanges();

    return zip(isAdmin, isManager).pipe(
      map(([admin, mgr]) => {
        const roles = [];
        if (admin !== undefined && admin['active']) roles.push('admin');
        if (mgr !== undefined && mgr['active']) roles.push('manager');

        return roles;
      })
    );

    // // this way is scalable but not synchronisable
    // return this.afs
    //   .collection('roles')
    //   .valueChanges({ idField: 'key' })
    //   .pipe<{ [key: string]: DocumentData }[], string[]>(
    //     mergeMap((docs) => {
    //       return forkJoin(
    //         docs.reduce((dict, doc) => {
    //           dict[doc.key] = this.afs
    //             .collection('roles')
    //             .doc(doc.key)
    //             .collection('role-users')
    //             .doc(uid)
    //             .get();
    //           return dict;
    //         }, {})
    //       );
    //     }),
    //     map<{ [key: string]: DocumentData }[], string[]>((docs) => {
    //       const roles = [];
    //       Object.keys(docs).forEach((key) => {
    //         const data = docs[key].data();
    //         if (data !== undefined && data['active']) roles.push(key);
    //       });
    //       return roles;
    //     })
    //   );

    //// Try a new way to get roles, not storing uid in documents
    // this.afs
    //   .collectionGroup('role-users', (ref) => ref.where('active', '==', true))
    //   .get()
    //   .subscribe((qs) => qs.docs.forEach((doc) => console.log(doc.id)));

    // return this.afs
    //   .collection('roles', (ref) => ref.where(uid, '==', true))
    //   .snapshotChanges()
    //   .pipe(
    //     map<DocumentChangeAction<unknown>[], string[]>((actions) =>
    //       actions.map((a) => a.payload.doc.id)
    //     )
    //   );
  }

  // isAdmin(uid: string): Observable<boolean> {
  //   if (uid === null) return of(null);
  //   return this.getRoles(uid).pipe(
  //     map<string[], boolean>((roles) => roles.includes('admin'))
  //   );
  // }

  // isManager(uid: string): Observable<boolean> {
  //   if (uid === null) return of(null);
  //   return this.getRoles(uid).pipe(
  //     map<string[], boolean>((roles) => roles.includes('manager'))
  //   );
  // }

  isAdmin(uid: string = this.user.uid): Observable<boolean> {
    if (!uid) return of(false);

    const ref = this.afs
      .collection('roles')
      .doc('admin')
      .collection('role-users')
      .doc(uid)
      .valueChanges();
    return ref.pipe(map((doc) => doc && doc['active']));
  }

  isManager(uid: string = this.user.uid): Observable<boolean> {
    if (!uid) return of(false);

    const ref = this.afs
      .collection('roles')
      .doc('manager')
      .collection('role-users')
      .doc(uid)
      .valueChanges();
    return ref.pipe(map((doc) => doc && doc['active']));
  }

  capitalise(string: string): string {
    const first = string[0].toUpperCase();
    return first + string.slice(1);
  }
}
