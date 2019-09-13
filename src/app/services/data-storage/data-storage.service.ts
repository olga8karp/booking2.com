import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { PropertyData } from '../../data-models/property-data.model';
import { Observable } from 'rxjs';
import { map, shareReplay, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  properties: Observable<PropertyData[]>;

  constructor(private db: AngularFirestore) {
    this.properties = this.getProperties().pipe(shareReplay());
  }

  addProperty(property: PropertyData) {
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
      }))) as Observable<any>;
  }

  getPropertyById(id: string): Observable<PropertyData> {
    return this.db.collection('properties').doc<PropertyData>(id).valueChanges();
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

    const arr = ['propertyRating', 'petFriendly'];

    let collection = this.db.collection('properties').ref;
    
    let query;

    arr.forEach(f => {
      if (query === undefined) {
        query = collection.where(f, '==', true);
      } else {
        query = query.where(f, '==', true);
      }
    });

    return query.get();

    // return this.db.collection('properties').ref
    //   .where('chargingStation', '==', chargingStation)
    //   .where('dinner', '==', dinner)
    //   .where('fitnessCenter', '==', fitnessCenter)
    //   .where('kitchen', '==', kitchen)
    //   .where('lunch', '==', lunch)
    //   .where('parking', '==', parking)
    //   .where('petFriendly', '==', petFriendly)
    //   .where('restaurant', '==', restaurant)
    //   .where('swimmingPool', '==', swimmingPool)
    //   .get();
  }
}
