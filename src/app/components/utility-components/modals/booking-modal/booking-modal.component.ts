import { Component, Input, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { Alert, AlertType } from "src/app/data-models/alert-model";
import { BookingService } from "src/app/services/booking/booking.service";
import { Subscription } from "rxjs";

@Component({
  selector: "b2-booking-modal",
  templateUrl: "./booking-modal.component.html",
  styleUrls: ["./booking-modal.component.css"]
})
export class BookingModalComponent implements OnDestroy {
  @Input() propertyId: string;
  alert: Alert = { type: null, message: null };
  bookedDates: Date[] = [];
  setBookedDatesSubscription: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private bookingService: BookingService
  ) {}

  bookForSelectedDates(form: NgForm): void {
    this.setBookedDatesSubscription = this.bookingService
      .setBookedDates(this.propertyId, form.value)
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

  ngOnDestroy() {
    this.setBookedDatesSubscription.unsubscribe();
  }
}
