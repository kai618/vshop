import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private header = { 'Content-Type': 'application/json' };

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  getAllAdminIds(): Observable<string[]> {
    const ref = this.afs
      .collection('roles')
      .doc('admin')
      .collection('role-users')
      .snapshotChanges()
      .pipe(
        map<DocumentChangeAction<firebase.firestore.DocumentData>[], string[]>(
          (actions) => {
            const ids = [];
            actions.forEach((action) => {
              const doc = action.payload.doc;
              ids.push({ id: doc.id, active: doc.get('active') });
            });
            return ids;
          }
        )
      );

    return ref;
  }

  async getAllUsers(): Promise<any> {
    const url = 'https://veggie-shop.herokuapp.com/users';

    try {
      const users = await this.http
        .get<Object>(url, { headers: this.header })
        .pipe(take(1))
        .toPromise();
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async grantAdmin(uid: string): Promise<boolean> {
    const url = 'https://veggie-shop.herokuapp.com/admin';

    try {
      const result = await this.http
        .post<boolean>(
          url,
          JSON.stringify({
            uid: uid,
          }),
          { headers: this.header }
        )
        .pipe(take(1))
        .toPromise();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async setAdminStatus(uid: string, status: boolean): Promise<boolean> {
    const url = `https://veggie-shop.herokuapp.com/admin/${uid}/${status}`;

    try {
      const result = await this.http
        .put<boolean>(url, { headers: this.header })
        .pipe(take(1))
        .toPromise();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async removeAdmin(uid: string): Promise<boolean> {
    const url = `https://veggie-shop.herokuapp.com/admin/${uid}`;

    try {
      const result = await this.http
        .delete<boolean>(url, { headers: this.header })
        .pipe(take(1))
        .toPromise();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
