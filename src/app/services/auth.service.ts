import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userSv: UserService
  ) {
    this.user$ = afAuth.authState;
    this.user$.subscribe((user) => (userSv.user = user));
  }

  async loginGoogleAccount() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

    try {
      const credential = await this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      this.router.navigateByUrl(returnUrl);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      console.error(error);
    }
  }

  async loginEmailPassword(email: string, pass: string) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

    try {
      const credential = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        pass
      );
      this.router.navigateByUrl(returnUrl);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 'auth/user-not-found':
          throw new Error('The email or password was wrong!');
        default:
          throw new Error('Unable to login!');
      }
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
