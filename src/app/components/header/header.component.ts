import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { LoginModalComponent } from "../modals/login-modal/login-modal.component";

@Component({
  selector: "b2-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private modalService: NgbModal
  ) {}

  openLoginModal(): void {
    this.modalService.open(LoginModalComponent);
  }

  logOut(): void {
    this.authService.logOut();
  }
}
