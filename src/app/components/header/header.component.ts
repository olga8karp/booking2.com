import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
  selector: 'b2-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public authService: AuthService, private modalService: NgbModal) { }

  openLoginModal() {
    const loginModalRef = this.modalService.open(LoginModalComponent);
  }

  openSignupModal() {
    const signinModalRef = this.modalService.open(SignupModalComponent);
  }
}
