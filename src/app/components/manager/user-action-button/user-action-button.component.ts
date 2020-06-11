import { Component, OnInit, Input } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-user-action-button',
  templateUrl: './user-action-button.component.html',
  styleUrls: ['./user-action-button.component.scss'],
})
export class UserActionButtonComponent implements OnInit {
  @Input() uid: string;
  @Input() isAdmin: boolean;
  @Input() isBlocked: boolean;

  constructor(
    private staffSv: StaffService,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit(): void {}

  async grantAdmin() {
    if (!this.uid) return;
    try {
      this.loadingSv.on();
      await this.staffSv.grantAdmin(this.uid);
    } catch (error) {
    } finally {
      this.loadingSv.off();
    }
  }

  async setBlockStatus() {
    if (!this.uid) return;
    try {
      this.loadingSv.on();
      await this.staffSv.setUserBlockStatus(this.uid, !this.isBlocked);
    } catch (error) {
    } finally {
      this.loadingSv.off();
    }
  }
}
