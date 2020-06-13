import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-staff-side-bar',
  templateUrl: './staff-side-bar.component.html',
  styleUrls: ['./staff-side-bar.component.scss'],
})
export class StaffSideBarComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isManager = false;

  private adminSubscription: Subscription;
  private managerSubscription: Subscription;

  constructor(public authSv: AuthService, public userSv: UserService) {}

  ngOnInit() {
    this.authSv.user$.subscribe((user) => {
      if (!user) {
        this.unsubscribe();
        return;
      }

      this.adminSubscription = this.userSv
        .isAdmin(user.uid)
        .subscribe((val) => (this.isAdmin = val));

      this.managerSubscription = this.userSv
        .isManager(user.uid)
        .subscribe((val) => (this.isManager = val));
    });
  }

  unsubscribe() {
    if (this.adminSubscription) this.adminSubscription.unsubscribe();
    if (this.managerSubscription) this.managerSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
