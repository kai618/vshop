import { Component, OnInit, Input } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-admin-action-button',
  templateUrl: './admin-action-button.component.html',
  styleUrls: ['./admin-action-button.component.scss'],
})
export class AdminActionButtonComponent implements OnInit {
  @Input() uid: string;
  @Input() status: boolean;

  constructor(private staffSv: StaffService) {}

  ngOnInit(): void {}

  async setAdminStatus() {
    if (!this.uid) return;
    try {
      await this.staffSv.setAdminStatus(this.uid, !this.status);
    } catch (error) {}
  }
  async removeAdmin() {
    if (!this.uid) return;
    try {
      await this.staffSv.removeAdmin(this.uid);
    } catch (error) {}
  }
}
