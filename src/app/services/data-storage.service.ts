import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Property } from '../shared/property.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  properties: Observable<Property[]>;

  constructor(private db: AngularFirestore) {
    this.properties = this.getProperties().pipe(shareReplay());
  }

  addProperty(property: Property) {
    return this.db.collection('properties').add(property);
  }

  getProperties() {
    return this.db.collection('properties').snapshotChanges()
    .pipe(map(actions => actions.map(a => { 
      return { propertyId: a.payload.doc.id, ...a.payload.doc.data() }; })) ) as Observable<Property[]>;
  }

  getPropertyById(id: string) {
    return this.db.collection('properties').doc(id).valueChanges();
  }
}
