import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  QueryDocumentSnapshot
} from "angularfire2/firestore";
import { PropertyData, SearchInputPropertyData } from "../../data-models/property-data.model";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  properties$: Observable<PropertyData[]>;
  firstInResponse: any = [];
  lastInResponse: any = [];
  prevStartAt: any = [];
  paginationClickedCount = 0;
  disableNext = false;
  disablePrev = false;
  page = 1;
  visitedPropertyId: number;

  private propertiesSubject = new BehaviorSubject<PropertyData[]>([null]);

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    this.loadItems();
    this.properties$ = this.propertiesSubject.asObservable();
  }

  loadItems(): void {
    this.firestore
      .collection("properties", ref =>
        ref.limit(6).orderBy("timestamp", "desc")
      )
      .snapshotChanges()
      .subscribe(
        response => {
          if (!response.length) {
            console.log("No Data Available");
            return false;
          }
          this.firstInResponse = response[0].payload.doc;
          this.lastInResponse = response[response.length - 1].payload.doc;

          const properties = [];
          for (const item of response) {
            properties.push(item.payload.doc.data());
          }
          this.propertiesSubject.next(properties);
          this.prevStartAt = [];
          this.paginationClickedCount = 0;
          this.disableNext = false;
          this.disablePrev = false;
          this.pushPrevStartAt(this.firstInResponse);
        },
        error => {
          console.log(error);
        }
      );
  }
  prevPage(): void {
    this.disablePrev = true;
    this.firestore
      .collection("properties", ref =>
        ref
          .orderBy("timestamp", "desc")
          .startAt(this.getPrevStartAt())
          .endBefore(this.firstInResponse)
          .limit(6)
      )
      .get()
      .subscribe(
        response => {
          this.firstInResponse = response.docs[0];
          this.lastInResponse = response.docs[response.docs.length - 1];

          const properties = [];
          for (const item of response.docs) {
            properties.push(item.data());
          }
          this.propertiesSubject.next(properties);
          this.paginationClickedCount--;
          this.popPrevStartAt(this.firstInResponse);
          this.disablePrev = false;
          this.disableNext = false;
        },
        error => {
          this.disablePrev = false;
        }
      );
  }

  nextPage(): void {
    this.disableNext = true;
    this.firestore
      .collection("properties", ref =>
        ref
          .limit(6)
          .orderBy("timestamp", "desc")
          .startAfter(this.lastInResponse)
      )
      .get()
      .subscribe(
        response => {
          if (!response.docs.length) {
            this.disableNext = true;
            return;
          }
          this.firstInResponse = response.docs[0];
          this.lastInResponse = response.docs[response.docs.length - 1];
          const properties = [];
          for (const item of response.docs) {
            properties.push(item.data());
          }
          this.propertiesSubject.next(properties);
          this.paginationClickedCount++;
          this.pushPrevStartAt(this.firstInResponse);
          this.disableNext = false;
        },
        error => {
          this.disableNext = false;
        }
      );
  }

  pushPrevStartAt(prevFirstDoc: any): void {
    this.prevStartAt.push(prevFirstDoc);
  }

  popPrevStartAt(prevFirstDoc: any): void {
    this.prevStartAt.forEach(element => {
      if (prevFirstDoc.data().id === element.data().id) {
        element = null;
      }
    });
  }

  getPrevStartAt() {
    if (this.prevStartAt.length > this.paginationClickedCount + 1) {
      (this.prevStartAt as QueryDocumentSnapshot<unknown>[]).splice(
        this.prevStartAt.length - 2,
        this.prevStartAt.length - 1
      );
    }
    return this.prevStartAt[this.paginationClickedCount - 1];
  }

  addProperty(property: PropertyData) {
    property.timestamp = new Date().getTime();
    const docId = property.timestamp.toString();
    return this.firestore
      .collection("properties")
      .doc(docId)
      .set(property);
  }

  getAllProperties() {
    return this.firestore
      .collection("properties", ref =>
        ref.orderBy("timestamp", "desc").limit(6)
      )
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            return { propertyId: a.payload.doc.id, ...a.payload.doc.data() };
          })
        )
      ) as Observable<any>;
  }

  getPropertyById(id: string): Observable<PropertyData> {
    return this.firestore
      .collection("properties")
      .doc<PropertyData>(id)
      .valueChanges();
  }

  getPropertiesBySearchInputParams(searchParams: SearchInputPropertyData) {
    const url = "https://us-central1-booking2project.cloudfunctions.net/getProperties";
    const paramsData = JSON.stringify(searchParams);
    const params: HttpParams = new HttpParams().set('searchData', paramsData);
    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    params.append("searchData", paramsData);

    return this.http
      .get(url, { headers, params })
      .toPromise()
      .then((res: PropertyData[]) => {
        this.propertiesSubject.next(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  //getFilteredProperties(searchData: SearchInputPropertyData) {
  //const collection = this.firestore.collection('properties').ref;
  //let query: Query;
  // arr.forEach(f => {
  //   if (query === undefined) {
  //     query = collection.
  //     query = query.where('facilities', 'array-contains', 'parking');
  //   }
  // });
  //return query.get();
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
  // }
}
