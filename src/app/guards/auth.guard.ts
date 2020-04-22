import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    const mapAuth = map<firebase.User, boolean>((user) => {
      if (user) return true;
      this.router.navigate(['/login']);
      return false;
    });

    return mapAuth(this.auth.user$);
  }
}
