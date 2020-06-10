import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-manager-staff',
  templateUrl: './manager-staff.component.html',
  styleUrls: ['./manager-staff.component.scss'],
})
export class ManagerStaffComponent implements OnInit {
  users: any[];

  constructor(private staffSv: StaffService) {}

  ngOnInit(): void {
    this.staffSv.getAllUsers().then((users) => (this.users = users));
  }
}
