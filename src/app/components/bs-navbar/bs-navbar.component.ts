import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss'],
})
export class BsNavbarComponent {
  public isMenuCollapsed = true;

  constructor(public auth: AuthService) {}

  logout() {
    this.isMenuCollapsed = true;
    this.auth.logout();
  }
}
