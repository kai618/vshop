import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    // FIXME: change to check if (user.isAdmin)
    return this.auth.user$.pipe(
      map<firebase.User, boolean>((user) => {
        if (true) return true;
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
