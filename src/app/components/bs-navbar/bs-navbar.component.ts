import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  isMenuCollapsed = true;
  isAdmin = false;
  isManager = false;

  constructor(public authSv: AuthService, public userSv: UserService) {}

  ngOnInit() {
    this.authSv.user$
      .pipe(
        switchMap((user) => (user ? this.userSv.isAdmin(user.uid) : of(false)))
      )
      .subscribe((val) => (this.isAdmin = val));

    this.authSv.user$
      .pipe(
        switchMap((user) =>
          user ? this.userSv.isManager(user.uid) : of(false)
        )
      )
      .subscribe((val) => (this.isManager = val));
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authSv.logout();
  }
}
