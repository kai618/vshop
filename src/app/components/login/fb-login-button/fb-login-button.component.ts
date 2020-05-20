import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-fb-login-button',
  templateUrl: './fb-login-button.component.html',
  styleUrls: ['./fb-login-button.component.scss'],
})
export class FbLoginButtonComponent {
  constructor(private authSv: AuthService) {}

  login() {
    this.authSv.loginFacebookAccount();
  }
}
