import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import {
  PropertyData,
  SearchInputPropertyData
} from "../../data-models/property-data.model";
import { cloudFunctionsGetPropertiesLink } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  properties$: Observable<PropertyData[]> = null;
  visitedPropertyId: number;

  private propertiesSubject = new BehaviorSubject<PropertyData[]>([null]);

  constructor(private firestore: AngularFirestore, private http: HttpClient) {
    this.properties$ = this.propertiesSubject.asObservable();
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
    const paramsData = JSON.stringify(searchParams);
    const params: HttpParams = new HttpParams().set("searchData", paramsData);
    const headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });
    params.append("searchData", paramsData);

    return this.http
      .get(cloudFunctionsGetPropertiesLink, { headers, params })
      .toPromise()
      .then((res: PropertyData[]) => {
        this.propertiesSubject.next(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
