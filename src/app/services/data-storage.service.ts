import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Property } from '../shared/property.model';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient) {}

  addProperty(property: Property) {
    this.getProperties().pipe(switchMap((properties: Property[] = []) => {
      properties = properties || [];
      properties.push(property);
      return this.http.put<Property[]>(environment.realTimeDatabasePropertiesLink, properties);
    })).subscribe(response => console.log(response));
  }

  getProperties() {
    return this.http.get<Property[]>(environment.realTimeDatabasePropertiesLink);
  }
}
