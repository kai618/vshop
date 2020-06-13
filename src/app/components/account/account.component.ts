import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit, OnDestroy {
  isAdmin: boolean = false;
  isManager: boolean = false;

  private adminSubscription: Subscription;
  private managerSubscription: Subscription;

  constructor(public userSv: UserService) {}

  ngOnInit(): void {
    this.adminSubscription = this.userSv
      .isAdmin()
      .subscribe((val) => (this.isAdmin = val));

    this.managerSubscription = this.userSv
      .isManager()
      .subscribe((val) => (this.isManager = val));
  }

  ngOnDestroy() {
    if (this.adminSubscription) this.adminSubscription.unsubscribe();
    if (this.managerSubscription) this.managerSubscription.unsubscribe();
  }
}
