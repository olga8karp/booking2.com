import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { first, map } from 'rxjs/operators';

import { BookingData } from 'src/app/data-models/booking-form-data.model';
import { PropertyData } from 'src/app/data-models/property-data.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  unavailableMessage = 'This property is unavailable for selected dates';

  constructor(private db: AngularFirestore) { }

  getAlertBookingSuccessMessage(bookedDatesArray: Date[]): string {
    return `You have booked this place from ${bookedDatesArray[0].getDate()}.${
      bookedDatesArray[0].getMonth() + 1}.${bookedDatesArray[0].getFullYear()}
  to ${bookedDatesArray[bookedDatesArray.length - 1].getDate()}.${
      bookedDatesArray[bookedDatesArray.length - 1].getMonth() + 1}.${
      bookedDatesArray[bookedDatesArray.length - 1].getFullYear()}`;
  }

  setBookedDates(propertyId: string, bookingData: BookingData): Observable<boolean> {
    const bookedDatesArray = bookingData.bookedDates;

    return this.db.collection('properties').doc<PropertyData>(propertyId).valueChanges()
      .pipe(first()).pipe(map((propertyData: PropertyData) => {
        const datesFromBD: Date[] = propertyData.bookedDates ? propertyData.bookedDates.map(date => date = (date).toDate()) : [];
        let updatedDates: Date[];

        if (!this.checkIfTwoDateArraysHaveCommonElement(bookedDatesArray, datesFromBD)) {
          this.saveBookingDetails(propertyId, bookingData);
          updatedDates = [...datesFromBD, ...bookedDatesArray];
          this.db.collection('properties').doc(propertyId)
            .set({ bookedDates: updatedDates }, { merge: true });
          return true;
        } else {
          return false;
        }
      }));
  }

  saveBookingDetails(propertyId: string, bookingData: BookingData): void {
    const timeOfBooking = new Date().toString();
    this.db.collection('bookings').doc(propertyId).set({ [timeOfBooking]: bookingData }, { merge: true });
  }

  checkIfTwoDateArraysHaveCommonElement(dateArr1: Date[], dateArr2: Date[]): boolean {
    let result = false;
    // tslint:disable: prefer-for-of
    for (let i = 0; i < dateArr1.length; i++) {
      for (let j = 0; j < dateArr2.length; j++) {
        if (dateArr1[i].getTime() === dateArr2[j].getTime()) {
          result = true;
        }
      }
    }
    return result;
  }
}
