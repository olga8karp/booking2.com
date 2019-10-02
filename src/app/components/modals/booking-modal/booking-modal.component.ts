import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { Alert, AlertType } from "src/app/data-models/alert-model";
import { BookingService } from "src/app/services/booking/booking.service";
import { Subscription } from "rxjs";
import { phoneRegEx } from "src/app/constants/regex";

@Component({
  selector: "b2-booking-modal",
  templateUrl: "./booking-modal.component.html",
  styleUrls: ["./booking-modal.component.css"]
})
export class BookingModalComponent implements OnInit, OnDestroy {
  bookingForm: FormGroup;
  bookedDates: Date[] = [];
  alert: Alert = { type: null, message: null };
  setBookedDatesSubscription: Subscription;
  @Input() propertyId: string;

  constructor(
    public activeModal: NgbActiveModal,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [
        "",
        [Validators.required, Validators.minLength(2), Validators.maxLength(30)]
      ],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(phoneRegEx)]],
      bookedDates: [[]]
    });
  }
  bookForSelectedDates(): void {
    this.bookedDates = this.bookingForm.value.bookedDates;
    this.setBookedDatesSubscription = this.bookingService
      .setBookedDates(this.propertyId, this.bookingForm.value)
      .subscribe((isBookingSuccessful: boolean) => {
        if (isBookingSuccessful) {
          this.alert.message = this.bookingService.getAlertBookingSuccessMessage(
            this.bookedDates
          );
          this.alert.type = AlertType.success;
        } else {
          this.alert.message = this.bookingService.unavailableMessage;
          this.alert.type = AlertType.danger;
        }
      });
  }

  closeAlert(): void {
    this.alert = { type: null, message: null };
  }

  showData() {
    console.log(this.bookedDates);
  }

  ngOnDestroy() {
    if (this.setBookedDatesSubscription) {
      this.setBookedDatesSubscription.unsubscribe();
    }
  }
}
