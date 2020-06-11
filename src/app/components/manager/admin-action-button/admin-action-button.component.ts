import { Component, OnInit, Input } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { LoadingBarComponent } from '../../loading-bar/loading-bar.component';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-admin-action-button',
  templateUrl: './admin-action-button.component.html',
  styleUrls: ['./admin-action-button.component.scss'],
})
export class AdminActionButtonComponent implements OnInit {
  @Input() uid: string;
  @Input() status: boolean;

  constructor(
    private staffSv: StaffService,
    private loadingSv: LoadingBarService
  ) {}

  ngOnInit(): void {}

  async setAdminStatus() {
    if (!this.uid) return;
    try {
      this.loadingSv.on();
      await this.staffSv.setAdminStatus(this.uid, !this.status);
    } catch (error) {
    } finally {
      this.loadingSv.off();
    }
  }
  async removeAdmin() {
    if (!this.uid) return;
    try {
      this.loadingSv.on();
      await this.staffSv.removeAdmin(this.uid);
    } catch (error) {
    } finally {
      this.loadingSv.off();
    }
  }
}
