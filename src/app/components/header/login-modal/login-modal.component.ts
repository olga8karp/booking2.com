import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'b2-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  isResetPasswordMode = false;

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) { }

  onSubmit(form: NgForm): void {
    if (this.isResetPasswordMode) {
      this.authService.forgotPassword(form.value.email);
    } else {
      this.authService.signIn(form.value.email, form.value.password);
    }
    form.reset();
    this.activeModal.close();
  }

  loginWithGoogle() {
    this.authService.googleSignin().finally(() =>
      this.activeModal.close());
  }

  toggleResetPasswordMode() {
    this.isResetPasswordMode = !this.isResetPasswordMode;
  }
}
