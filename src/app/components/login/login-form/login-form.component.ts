import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingBarService } from 'src/app/services/loading-bar.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('form') form: NgForm;
  error: string;

  constructor(
    private authSv: AuthService,
    private loadingSv: LoadingBarService
  ) {}

  async onSubmit() {
    if (!this.form.valid) return;
    try {
      this.loadingSv.on();
      await this.authSv.loginEmailPassword(
        this.form.value.email,
        this.form.value.password
      );
    } catch (error) {
      this.error = error.message;
      // this.form.reset();
    } finally {
      this.loadingSv.off();
    }
  }
}
