import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private header = { 'Content-Type': 'application/json' };

  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  async getAllUsers(): Promise<Object> {
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
}
