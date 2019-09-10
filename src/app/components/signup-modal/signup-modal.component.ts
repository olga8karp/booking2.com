import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'b2-signup-modal',
  templateUrl: './signup-modal.component.html',
  styleUrls: ['./signup-modal.component.css']
})
export class SignupModalComponent {

  constructor(public activeModal: NgbActiveModal, private authService: AuthService, private modalService: NgbModal) { }

  onSubmit(form: NgForm): void {
    this.authService.signUp(form.value.email, form.value.password);
    form.reset();
  }

  loginWithGoogle() {
    this.authService.googleSignin();
  }

  switchToLogin() {
    this.activeModal.close();
    const loginModalRef = this.modalService.open(LoginModalComponent);
  }
}
