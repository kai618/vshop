import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private userSv: UserService
  ) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$
      .pipe(
        switchMap<firebase.User, Observable<any>>((user) => {
          return this.userSv.getRoles(user.uid);
        })
      )
      .pipe(
        map<any, boolean>((roles) => {
          console.log(roles);
          if (roles.includes('admin')) return true;
          return false;
        })
      );
  }
}
