import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import {
  PropertyData,
  SearchInputPropertyData
} from "../../data-models/property-data.model";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  properties$: Observable<PropertyData[]>;
  visitedPropertyId: number;

  private propertiesSubject = new BehaviorSubject<PropertyData[]>([null]);

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    this.loadItems();
    this.properties$ = this.propertiesSubject.asObservable();
  }

  loadItems(): void {
    this.firestore
      .collection("properties")
      .snapshotChanges()
      .subscribe(
        response => {
          if (!response.length) {
            console.log("No Data Available");
            return false;
          }
          const properties = [];
          for (const item of response) {
            properties.push(item.payload.doc.data());
          }
          this.propertiesSubject.next(properties);
        },
        error => {
          console.log(error);
        }
      );
  }

  addProperty(property: PropertyData) {
    property.timestamp = new Date().getTime();
    const docId = property.timestamp.toString();
    return this.firestore
      .collection("properties")
      .doc(docId)
      .set(property);
  }

  getPropertyById(id: string): Observable<PropertyData> {
    return this.firestore
      .collection("properties")
      .doc<PropertyData>(id)
      .valueChanges();
  }

  getPropertiesBySearchInputParams(searchParams: SearchInputPropertyData) {
    const url =
      "https://us-central1-booking2project.cloudfunctions.net/getProperties";
    const paramsData = JSON.stringify(searchParams);
    const params: HttpParams = new HttpParams().set("searchData", paramsData);
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
}
