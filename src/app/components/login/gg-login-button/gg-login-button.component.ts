import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-gg-login-button',
  templateUrl: './gg-login-button.component.html',
  styleUrls: ['./gg-login-button.component.scss'],
})
export class GgLoginButtonComponent {
  constructor(
    private authSv: AuthService,
    private loadingSv: LoadingBarService
  ) {}

  async login() {
    this.loadingSv.on();
    await this.authSv.loginGoogleAccount();
    this.loadingSv.off();
  }
}
