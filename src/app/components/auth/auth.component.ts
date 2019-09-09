import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FirebaseAuth } from 'angularfire2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'b2-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isResetPasswordMode = false;

  constructor(private authService: AuthService){}

  onSwitchMode() {
    this.isResetPasswordMode = false;
    this.isLoginMode = !this.isLoginMode;
  }

  getSubmitButtonText() {
    if (this.isResetPasswordMode) {
      return 'Send password recovery email';
    } else if (this.isLoginMode) {
      return 'Login';
    } else {
        return 'Sign Up';
    }
  }

  onSubmit(form: NgForm) {
    try {
    if (this.isResetPasswordMode) {
      this.authService.forgotPassword(form.value.email);
    } else if (this.isLoginMode) {
      this.authService.signIn(form.value.email, form.value.password);
    } else {
      this.authService.signUp(form.value.email, form.value.password);
    }
  } catch (error) {
    console.log(error);
  }
    form.reset();
  }

  toggleResetPasswordMode(){
    this.isResetPasswordMode = !this.isResetPasswordMode;
  }
}