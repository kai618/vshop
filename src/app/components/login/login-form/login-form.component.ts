import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('form') form: NgForm;
  error: string;

  constructor(private authSv: AuthService) {}

  async onSubmit() {
    console.log(this.form);
    if (!this.form.valid) return;
    try {
      await this.authSv.loginEmailPassword(
        this.form.value.email,
        this.form.value.password
      );
    } catch (error) {
      this.error = error.message;
    } finally {
      this.form.reset();
    }
  }
}
