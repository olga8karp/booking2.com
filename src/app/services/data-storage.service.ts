import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Property, BookedDatesRange } from '../shared/property.model';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  properties: Observable<Property[]>;
  unavailableDates = new Subject<BookedDatesRange[]>();

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
    const fromDate = Object.assign({}, dates.dateRange.fromDate);
    const toDate = Object.assign({}, dates.dateRange.toDate);
    const bookedDatesArray = dates.dateRange.bookedDatesArray;
    let bookedDates: BookedDatesRange[];
    this.db.collection('properties').doc(id).valueChanges().subscribe((propertyData: Property) => {
      bookedDates = propertyData.bookedDates || [];
      if (!bookedDates.find(dateRange => this.deepIsEqual(dateRange.fromDate, fromDate) ||
      this.deepIsEqual(dateRange.toDate, toDate))) {
        bookedDates.push({
          fromDate,
          toDate,
          bookedDatesArray
        });
        this.db.collection('properties').doc(id).set({ bookedDates }, { merge: true });
        this.unavailableDates.next(bookedDates);
      }
    });
  }

  deepIsEqual(first, second) {
    // If first and second are the same type and have the same value
    // Useful if strings or other primitive types are compared
    // tslint:disable-next-line: curly
    if (first === second) return true;

    // Try a quick compare by seeing if the length of properties are the same
    // tslint:disable-next-line: prefer-const
    let firstProps = Object.getOwnPropertyNames(first);
    // tslint:disable-next-line: prefer-const
    let secondProps = Object.getOwnPropertyNames(second);

    // Check different amount of properties
    // tslint:disable-next-line: curly
    if (firstProps.length != secondProps.length) return false;

    // Go through properties of first object
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < firstProps.length; i++) {
      let prop = firstProps[i];
      // Check the type of property to perform different comparisons
      switch (typeof (first[prop])) {
        // If it is an object, decend for deep compare
        case 'object':
          // tslint:disable-next-line: curly
          if (!this.deepIsEqual(first[prop], second[prop])) return false;
          break;
        case 'number':
          // with JavaScript NaN != NaN so we need a special check
          // tslint:disable-next-line: curly
          if (isNaN(first[prop]) && isNaN(second[prop])) break;
        // tslint:disable-next-line: no-switch-case-fall-through
        default:
          // tslint:disable-next-line: curly
          if (first[prop] !== second[prop]) return false;
      }
    }
    return true;
  }
}
