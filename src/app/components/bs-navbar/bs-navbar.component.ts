import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  isMenuCollapsed = true;
  isAdmin = false;
  isManager = false;

  constructor(public authSv: AuthService, public userSv: UserService) {
    authSv.user$
      .pipe(switchMap((user) => (user ? userSv.isAdmin(user.uid) : of(false))))
      .subscribe((val) => (this.isAdmin = val));
    authSv.user$
      .pipe(
        switchMap((user) => (user ? userSv.isManager(user.uid) : of(false)))
      )
      .subscribe((val) => (this.isManager = val));
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authSv.logout();
  }
}
