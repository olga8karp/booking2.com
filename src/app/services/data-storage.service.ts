import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { Property } from '../shared/property.model';
import { pipe, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  propertiesCollection: AngularFirestoreCollection<Property[]>;
  properties: Observable<Property[][]>;

  constructor(private afs: AngularFirestore, private sanitizer: DomSanitizer) {
    //this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
    this.propertiesCollection = this.afs.collection('properties', ref => {
      return ref;
    });
    this.properties = this.propertiesCollection.valueChanges();
  }

  addProperty(property: Property) {
  //  // this.getProperties().pipe(switchMap((properties: Property[] = []) => {
  //     properties = properties || [];
  //     properties.push(property);
  //     //return this.http.put<Property[]>(environment.realTimeDatabasePropertiesLink, properties);
   // }));
  }

  getProperties() {
    //return this.http.get<Property[]>(environment.realTimeDatabasePropertiesLink);
  }
}
