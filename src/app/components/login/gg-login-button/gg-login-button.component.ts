import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gg-login-button',
  templateUrl: './gg-login-button.component.html',
  styleUrls: ['./gg-login-button.component.scss'],
})
export class GgLoginButtonComponent {
  constructor(private auth: AuthService) {}

  login() {
    this.auth.loginGoogleAccount();
  }
}
