import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private userSv: UserService,
    private afs: AngularFirestore
  ) {
    this.user$ = afAuth.authState.pipe(
      map<firebase.User, User>((user) => this.userSv.toUser(user))
    );
    this.user$.subscribe((user) => (userSv.user = user));
  }

  async loginGoogleAccount() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

    try {
      const credential = await this.afAuth.auth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );

      await this.checkBlockedUser(credential.user.uid);

      this.router.navigateByUrl(returnUrl);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      console.error(error);
    }
  }
  async loginFacebookAccount() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';

    try {
      const credential = await this.afAuth.auth.signInWithPopup(
        new firebase.auth.FacebookAuthProvider()
      );

      await this.checkBlockedUser(credential.user.uid);

      this.router.navigateByUrl(returnUrl);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      // https://firebase.google.com/docs/auth/web/google-signin#expandable-1-label
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

      await this.checkBlockedUser(credential.user.uid);

      this.router.navigateByUrl(returnUrl);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 'auth/blocked-email':
          throw new Error(error.message);
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          throw new Error('The email or password was wrong!');
        default:
          throw new Error('Unable to login!');
      }
    }
  }

  async signUpEmailPassword(email: string, pass: string) {
    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        pass
      );

      this.router.navigate(['/']);
      this.userSv.storeInFirestore(credential.user);
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case 'auth/invalid-email':
          throw new Error(error.message);
        case 'auth/email-already-in-use':
          throw new Error('This email address is already in use!');
        default:
          throw new Error('Unable to sign up!');
      }
    }
  }

  async logout() {
    try {
      await this.afAuth.auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  async checkBlockedUser(uid: string): Promise<void> {
    try {
      const snapshot = await this.afs
        .collection('blocked-users')
        .doc(uid)
        .get()
        .toPromise();

      if (snapshot.exists) {
        this.logout();
        throw {
          code: 'auth/blocked-email',
          message: 'This email address is blocked!',
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
