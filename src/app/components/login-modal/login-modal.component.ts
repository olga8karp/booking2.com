import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'b2-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  isResetPasswordMode = false;

  constructor(public activeModal: NgbActiveModal, private authService: AuthService, private modalService: NgbModal) { }

  onSubmit(form: NgForm): void {
    if (this.isResetPasswordMode) {
      this.authService.forgotPassword(form.value.email);
    } else {
      this.authService.signIn(form.value.email, form.value.password);
    }
    form.reset();
  }

  loginWithGoogle() {
    this.authService.googleSignin();
  }

  toggleResetPasswordMode() {
    this.isResetPasswordMode = !this.isResetPasswordMode;
  }

  switchToSignup() {
    this.activeModal.close();
    const loginModalRef = this.modalService.open(SignupModalComponent);
  }
}
