import { Component, OnInit, Input } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-user-action-button',
  templateUrl: './user-action-button.component.html',
  styleUrls: ['./user-action-button.component.scss'],
})
export class UserActionButtonComponent implements OnInit {
  @Input() uid: string;

  constructor(private staffSv: StaffService) {}

  ngOnInit(): void {}

  grantAdmin() {
    if (!this.uid) return;
    try {
      this.staffSv.grantAdmin(this.uid);
    } catch (error) {}
  }
}
