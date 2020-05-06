import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  public isMenuCollapsed = true;
  private roleSub: Subscription;
  public isAdmin = false;
  public isManager = false;

  constructor(public authSv: AuthService, private userSv: UserService) {
    this.roleSub = authSv.user$
      .pipe(switchMap((user) => userSv.getRoles(user.uid)))
      .subscribe((roles) => {
        if (roles.includes('admin')) this.isAdmin = true;
        if (roles.includes('manager')) this.isManager = true;
      });
  }

  logout() {
    this.isMenuCollapsed = true;
    this.roleSub?.unsubscribe();
    this.authSv.logout();
  }
}
