import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    const mapAuth = map<firebase.User, boolean>((user) => {
      if (!user) return true;
      this.router.navigate(['/']);
      return false;
    });

    return mapAuth(this.auth.user$);
  }
}
