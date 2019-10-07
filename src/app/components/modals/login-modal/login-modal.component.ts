import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/app/services/auth/auth.service";
import { Alert, AlertType, SuccessAlertMessage } from "../../../data-models/alert-model";
import { CurrentModeLabel } from "../../../data-models/login-mode.enum";
import { AuthFormData } from 'src/app/data-models/auth-form-data.model';

@Component({
  selector: "b2-login-modal",
  templateUrl: "./login-modal.component.html",
  styleUrls: ["./login-modal.component.css"]
})

export class LoginModalComponent implements OnInit {
  loginForm: FormGroup;
  isLoginMode = true;
  isResetPasswordMode = false;
  alert: Alert = { type: null, message: null };

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      "email": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required, Validators.minLength(6)]]
    });
  }

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

  onSubmit(): void {
    const formData: AuthFormData = this.loginForm.value;
    if (this.isResetPasswordMode) {
      this.authService
        .forgotPassword(formData.email)
        .then(() => {
          this.alert.message = SuccessAlertMessage.emailSent;
          this.alert.type = AlertType.success;
        })
        .catch((error: Error) => {
          this.alert.message = error.message;
          this.alert.type = AlertType.danger;
        });
    } else if (this.isLoginMode) {
      this.authService
        .logIn(formData.email, formData.password)
        .then(() => {
          this.alert.message = SuccessAlertMessage.loginSuccess;
          this.alert.type = AlertType.success;
        })
        .catch((error: Error) => {
          this.alert.message = error.message;
          this.alert.type = AlertType.danger;
        });
    } else {
      this.authService
        .signUp(formData.email, formData.password)
        .then(() => {
          this.alert.message = SuccessAlertMessage.signupSuccess;
          this.alert.type = AlertType.success;
        })
        .catch((error: Error) => {
          this.alert.message = error.message;
          this.alert.type = AlertType.danger;
        });
    }
  }

  googleSignin(): void {
    this.authService
      .googleSignin()
      .then(() => {
        this.alert.message = SuccessAlertMessage.loginSuccess;
        this.alert.type = AlertType.success;
      })
      .catch((error: Error) => {
        this.alert.message = error.message;
        this.alert.type = AlertType.danger;
      });
  }

  toggleResetPasswordMode(event: MouseEvent): boolean {
    this.isResetPasswordMode = !this.isResetPasswordMode;
    event.preventDefault();
    return false;
  }

  closeAlert(): void {
    this.alert = { type: null, message: null };
  }
}
