import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-staff-side-bar',
  templateUrl: './staff-side-bar.component.html',
  styleUrls: ['./staff-side-bar.component.scss'],
})
export class StaffSideBarComponent implements OnInit {
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
  }
}
