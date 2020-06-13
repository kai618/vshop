import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { Subscription } from 'rxjs';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit, OnDestroy {
  users: any[];
  admins: any[];
  blockedUserIds: string[];

  private adminsSubscription: Subscription;
  private blockedUserSubscription: Subscription;

  constructor(
    private staffSv: StaffService,
    private loadingSv: LoadingBarService,
    private userSv: UserService
  ) {}

  ngOnInit(): void {
    this.loadingSv.on();
    this.staffSv.getAllUsers().then((users) => {
      this.loadingSv.off();
      this.users = users;

      this.adminsSubscription = this.staffSv
        .getAllAdminIds()
        .subscribe((adminIfo) => {
          // console.log(adminIfo);

          // FIXME: something wrong happens with firestore when there are two subcollections having the same name
          if (adminIfo.length == 1 && adminIfo[0]['id'] == this.userSv.user.uid)
            return;

          this.admins = this.getFullAdminInfo(adminIfo, this.users);
        });

      this.blockedUserSubscription = this.staffSv
        .getAllBlockedUserIds()
        .subscribe((blockedUserIds) => {
          this.blockedUserIds = blockedUserIds;
        });
    });
  }

  ngOnDestroy(): void {
    this.adminsSubscription?.unsubscribe();
    this.blockedUserSubscription?.unsubscribe();
  }

  getFullAdminInfo(adminInfo: any[], users: any[]): any[] {
    const fullInfo = [];
    adminInfo.forEach((admin) => {
      const user = users.find((user) => user.id == admin.id);
      if (!user) return;
      fullInfo.push({
        ...admin,
        ...user,
      });
    });
    return fullInfo;
  }

  isAdmin(uid: string): boolean {
    return this.admins.some((admin) => admin.id == uid);
  }
  isBlocked(uid: string): boolean {
    return this.blockedUserIds.includes(uid);
  }
}
