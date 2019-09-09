import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Property } from '../shared/property.model';
import { Observable } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  properties: Observable<Property[]>;

  constructor(private db: AngularFirestore) {
    this.properties = this.getProperties().pipe(shareReplay());
  }

  addProperty(property: Property) {
    property.timestamp = new Date().getTime();
    const docId = property.timestamp.toString();
    return this.db.collection('properties').doc(docId).set(property);
  }

  getProperties() {
    return this.db.collection('properties', ref => ref
    .orderBy('timestamp', 'desc')
    .limit(6)
  ).snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        return { propertyId: a.payload.doc.id, ...a.payload.doc.data() };
      }))) as Observable<Property[]>;
  }

  getPropertyById(id: string) {
    return this.db.collection('properties').doc(id).valueChanges();
  }

  getFilteredProperties({ breakfast,
    chargingStation,
    dinner,
    fitnessCenter,
    kitchen,
    parking,
    petFriendly,
    numberOfGuests,
    lunch,
    description,
    propertyType,
    restaurant,
    swimmingPool,
    propertyRating,
    location }) {

    return this.db.collection('properties').ref
       .where('chargingStation', '==', chargingStation)
       .where('dinner', '==', dinner)
       .where('fitnessCenter', '==', fitnessCenter)
       .where('kitchen', '==', kitchen)
       .where('lunch', '==', lunch)
       .where('parking', '==', parking)
       .where('petFriendly', '==', petFriendly)
       .where('restaurant', '==', restaurant)
       .where('swimmingPool', '==', swimmingPool)
      .get();
  }

  setBookedDates(propertyId, bookingData) {
    const bookedDatesArray = bookingData.dateRange.bookedDatesArray;

    this.db.collection('properties').doc(propertyId).valueChanges()
    .pipe(first()).subscribe((propertyData: Property) => {
      console.log(propertyData);
      const datesInBD = propertyData.bookedDates ? propertyData.bookedDates.map(date => date = date.toDate()) : [];

      if (!this.checkIfTwoDateArraysHaveCommonElement(bookedDatesArray, datesInBD)) {
        datesInBD.push(...
          bookedDatesArray
        );

        alert(`You have booked this place from ${bookedDatesArray[0].getDate()}.${
          bookedDatesArray[0].getMonth() + 1}.${bookedDatesArray[0].getFullYear()}
          to ${bookedDatesArray[bookedDatesArray.length - 1].getDate()}.${
          bookedDatesArray[bookedDatesArray.length - 1].getMonth() + 1}.${
          bookedDatesArray[bookedDatesArray.length - 1].getFullYear()}`);
        this.db.collection('properties').doc(propertyId)
        .set({ bookedDates: datesInBD }, { merge: true });
      } else {
        alert('This property is unavailable for the selected dates.');
      }
    });
  }

  saveBookingDetails(propertyId, bookingData) {
    bookingData.propertyId = propertyId;
    return this.db.collection('bookings').doc(propertyId).set(bookingData);
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
