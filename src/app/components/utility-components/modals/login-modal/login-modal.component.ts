import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/auth/auth.service';
import { Alert, AlertType, SuccessAlertMessage } from '../../../../data-models/alert-model';
import { CurrentModeLabel } from '../../../../data-models/login-mode.enum';
import { AuthFormData } from '../../../../data-models/auth-form-data.model';

@Component({
  selector: 'b2-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  isLoginMode = true;
  isResetPasswordMode = false;
  alert: Alert = { type: null, message: null };

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) { }

  onSwitchMode(): void {
    this.isResetPasswordMode = false;
    this.isLoginMode = !this.isLoginMode;
  }

  getCurrentModeLabel(): string {
    if (this.isResetPasswordMode) {
      return CurrentModeLabel.passRecoveryMode;
    } else if (this.isLoginMode) {
      return CurrentModeLabel.loginMode;
    } else {
      return CurrentModeLabel.signupMode;
    }
  }

  onSubmit(formData: AuthFormData): void {
    if (this.isResetPasswordMode) {
      this.authService.forgotPassword(formData.email).then(() => {
        this.alert.message = SuccessAlertMessage.emailSent; this.alert.type = AlertType.success;
      }).catch((error: Error) => {
        this.alert.message = error.message; this.alert.type = AlertType.danger;
      });
    } else if (this.isLoginMode) {
      this.authService.logIn(formData.email, formData.password).then(() => {
        this.alert.message = SuccessAlertMessage.loginSuccess; this.alert.type = AlertType.success;
      }).catch((error: Error) => {
        this.alert.message = error.message; this.alert.type = AlertType.danger;
      });
    } else {
      this.authService.signUp(formData.email, formData.password).then(() => {
        this.alert.message = SuccessAlertMessage.signupSuccess; this.alert.type = AlertType.success;
      }).catch((error: Error) => {
        this.alert.message = error.message; this.alert.type = AlertType.danger;
      });
    }
  }

  googleSignin(): void {
    this.authService.googleSignin().then(() => {
      this.alert.message = SuccessAlertMessage.loginSuccess; this.alert.type = AlertType.success;
    }).catch((error: Error) => {
      this.alert.message = error.message; this.alert.type = AlertType.danger;
    });
  }

  toggleResetPasswordMode(event): boolean {
    this.isResetPasswordMode = !this.isResetPasswordMode;
    event.preventDefault();
    return false;
  }

  closeAlert(): void {
    this.alert = { type: null, message: null };
  }
}
