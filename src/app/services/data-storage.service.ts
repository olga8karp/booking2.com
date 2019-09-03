import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Property, NgbDate } from '../shared/property.model';
import { Observable, Subject, pipe } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  properties: Observable<Property[]>;
  unavailableDates = new Subject<any[]>();

  constructor(private db: AngularFirestore) {
    this.properties = this.getProperties().pipe(shareReplay());
  }

  addProperty(property: Property) {
    return this.db.collection('properties').add(property);
  }

  getProperties() {
    return this.db.collection('properties').snapshotChanges()
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
      //  .where('chargingStation', '==', chargingStation)
      //  .where('dinner', '==', dinner)
      //  .where('fitnessCenter', '==', fitnessCenter)
      //  .where('kitchen', '==', kitchen)
      //  .where('lunch', '==', lunch)
      //.where('numberOfGuests', '==', numberOfGuests)
      //  .where('parking', '==', parking)
      //.where('price', '==', '20')
      //  .where('petFriendly', '==', petFriendly)
      // .where('description', 'array-contains', '')
      //  .where('propertyType', '==', propertyType)
      //  .where('restaurant', '==', restaurant)
      //  .where('swimmingPool', '==', swimmingPool)
      // .where('propertyRating', '==', propertyRating)
      .get();
  }

  setBookedDates(id, dates) {
    const bookedDatesArray = dates.dateRange.bookedDatesArray;

    this.db.collection('properties').doc(id).valueChanges().pipe(first()).subscribe((propertyData: Property) => {
      const datesInBD = propertyData.bookedDates ? propertyData.bookedDates.map(date => date = date.toDate()) : [];

      if (!this.checkIfTwoDateArraysHaveCommonElement(bookedDatesArray, datesInBD)) {
        datesInBD.push(...
          bookedDatesArray
        );

        alert("You have booked this place from " + bookedDatesArray[0] + " to " + bookedDatesArray[bookedDatesArray.length - 1]);
        this.db.collection('properties').doc(id).set({ bookedDates: datesInBD }, { merge: true });
        this.unavailableDates.next(datesInBD);
      } else {
        alert("This property is unavailable for the selected dates.");
      }
    });
  }

  checkIfTwoDateArraysHaveCommonElement(dateArr1: Date[], dateArr2: Date[]): boolean {
    let result = false;
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
