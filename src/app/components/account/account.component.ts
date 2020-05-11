import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  roles: Observable<string[]>;

  constructor(public userSv: UserService, private authSv: AuthService) {
    this.roles = authSv.user$.pipe(switchMap((user) => userSv.getRoles(user.uid)));
  }

  ngOnInit(): void {}
}
