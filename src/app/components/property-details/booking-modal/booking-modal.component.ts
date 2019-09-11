import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'b2-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {
  @Input() propertyId;

  name = '';
  phone = '';
  email = '';
  bookedDates = [];

  constructor(public activeModal: NgbActiveModal, private dataService: DataStorageService) { }

  bookForSelectedDates(form: NgForm): void {
    this.dataService.setBookedDates(this.propertyId, form.value);
  }
}
