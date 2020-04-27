import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  public isMenuCollapsed = true;
  public isAdmin = false;
  private adminSub: Subscription;

  constructor(public auth: AuthService, private userSv: UserService) {
    auth.user$.subscribe((user) => {
      if (user)
        this.adminSub = userSv
          .isAdmin(user.uid)
          .subscribe((val) => (this.isAdmin = val));
    });
  }

  logout() {
    this.isMenuCollapsed = true;
    this.adminSub?.unsubscribe();
    this.auth.logout();
  }
}
