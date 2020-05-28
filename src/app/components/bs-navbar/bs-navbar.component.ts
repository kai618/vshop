import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent implements OnInit {
  isMenuCollapsed = true;
  isAdmin = false;
  isManager = false;

  private adminSubscription: Subscription;
  private manangerSubscription: Subscription;

  constructor(public authSv: AuthService, public userSv: UserService) {}

  ngOnInit() {
    this.authSv.user$.subscribe((user) => {
      if (!user) {
        if (this.adminSubscription) this.adminSubscription.unsubscribe();
        if (this.manangerSubscription) this.manangerSubscription.unsubscribe();
        return;
      }

      this.adminSubscription = this.userSv
        .isAdmin(user.uid)
        .subscribe((val) => {
          if (!val && this.isAdmin) window.location.reload();
          this.isAdmin = val;
        });

      this.manangerSubscription = this.userSv
        .isManager(user.uid)
        .subscribe((val) => {
          if (!val && this.isManager) window.location.reload();
          this.isManager = val;
        });
    });

    // this.authSv.user$
    //   .pipe(
    //     switchMap((user) => user ? this.userSv.isAdmin(user.uid) : of(false))
    //   )
    //   .subscribe((val) => (this.isAdmin = val));

    // this.authSv.user$
    //   .pipe(
    //     switchMap((user) => user ? this.userSv.isManager(user.uid) : of(false))
    //   )
    //   .subscribe((val) => (this.isManager = val));
  }

  logout() {
    this.isMenuCollapsed = true;
    this.authSv.logout();
  }
}
