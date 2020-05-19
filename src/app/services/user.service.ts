import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';
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
      else
        doc.set({
          name: user.displayName,
          email: user.email,
          firstTime: Date.now(),
        });
    } catch (error) {
      console.error(error);
    }
  }

  getRoles(uid: string): Observable<string[]> {
    return this.afs
      .collection('roles')
      .valueChanges({ idField: 'key' })
      .pipe<{ [key: string]: DocumentData }[], string[]>(
        mergeMap((docs) => {
          return forkJoin(
            docs.reduce((dict, doc) => {
              dict[doc.key] = this.afs
                .collection('roles')
                .doc(doc.key)
                .collection('role-users')
                .doc(uid)
                .get();
              return dict;
            }, {})
          );
        }),
        map<{ [key: string]: DocumentData }[], string[]>((docs) => {
          const roles = [];
          Object.keys(docs).forEach((key) => {
            const data = docs[key].data();
            if (data !== undefined && data['active']) roles.push(key);
          });

          // console.log(roles);
          return roles;
        })
      );

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

  isAdmin(uid: string): Observable<boolean> {
    if (uid === null) return of(null);
    return this.getRoles(uid).pipe(
      map<string[], boolean>((roles) => roles.includes('admin'))
    );
  }

  isManager(uid: string): Observable<boolean> {
    if (uid === null) return of(null);
    return this.getRoles(uid).pipe(
      map<string[], boolean>((roles) => roles.includes('manager'))
    );
  }

  capitalise(string: string): string {
    const first = string[0].toUpperCase();
    return first + string.slice(1);
  }
}
