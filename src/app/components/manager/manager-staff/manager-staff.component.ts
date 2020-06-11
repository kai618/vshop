import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit, OnDestroy {
  users: any[];
  admins: any[];

  private adminsSubscription: Subscription;

  constructor(private staffSv: StaffService) {}

  ngOnInit(): void {
    this.staffSv.getAllUsers().then((users) => {
      this.users = users;
      this.adminsSubscription = this.staffSv
        .getAllAdminIds()
        .subscribe((adminIfo) => {
          this.admins = this.getFullAdminInfo(adminIfo, this.users);
          // console.log(this.admins);
        });
    });
  }

  ngOnDestroy(): void {
    this.adminsSubscription.unsubscribe();
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
}
