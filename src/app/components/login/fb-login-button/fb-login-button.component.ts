import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingBarService } from 'src/app/services/loading-bar.service';
@Component({
  selector: 'app-fb-login-button',
  templateUrl: './fb-login-button.component.html',
  styleUrls: ['./fb-login-button.component.scss'],
})
export class FbLoginButtonComponent {
  constructor(
    private authSv: AuthService,
    private loadingSv: LoadingBarService
  ) {}

  async login() {
    try {
      this.loadingSv.on();
      await this.authSv.loginFacebookAccount();
    } catch (error) {
      //TODO: catch thrown errors
    } finally {
      this.loadingSv.off();
    }
  }
}
