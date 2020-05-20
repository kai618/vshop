import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent {
  @ViewChild('form') form: NgForm;
  confirmError: string;
  requestError: string;

  constructor(private authSv: AuthService) {}

  onChange(pass: string, confirm: string) {
    if (!confirm) this.confirmError = 'Please provide a confirm password';
    else if (confirm != pass)
      this.confirmError = 'The confirm password does not match';
    else this.confirmError = null;
  }

  async onSubmit() {
    if (!this.form.valid || this.confirmError) return;
    try {
      await this.authSv.signUpEmailPassword(
        this.form.value.email,
        this.form.value.password
      );
    } catch (error) {
      this.requestError = error.message;
      this.form.reset();
    }
  }
}
