import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';

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

  private getRoleList(): Observable<string[]> {
    return this.afs
      .collection('roles')
      .snapshotChanges()
      .pipe(map((actions) => actions.map((a) => a.payload.doc.id)));
  }

  getRoles(uid: string): Observable<String[]> {
    this.afs
      .collectionGroup('role-users', (ref) => ref.where('active', '==', true))
      .get()
      .subscribe((qs) => qs.docs.forEach((doc) => console.log(doc.id)));

    this.afs
      .collection('roles')
      .snapshotChanges()
      .pipe(
        mergeMap((actions) =>
          forkJoin(
            actions.map((a) =>
              this.afs
                .collection('roles')
                .doc(a.payload.doc.id)
                .collection('role-users')
                .doc(uid)
                .get()
            )
          )
        )
      )
      .subscribe((_) => console.log(_.map((d) => d.data())));

    // FIXME: Try a new way to get roles, not storing uid in documents
    return this.afs
      .collection('roles', (ref) => ref.where(uid, '==', true))
      .snapshotChanges()
      .pipe(
        map<DocumentChangeAction<unknown>[], string[]>((actions) =>
          actions.map((a) => a.payload.doc.id)
        )
      );
  }

  isAdmin(uid: string): Observable<boolean> {
    if (uid === null) return of(null);
    return this.getRoles(uid).pipe(
      map<string[], boolean>((roles) => roles.includes('admin'))
    );
  }
}
