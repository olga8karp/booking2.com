import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PropertiesService } from '../properties.service';
import { Property } from './property.model';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private propertiesService: PropertiesService) {}

  addProperty(property: Property) {
    const propertyList = this.propertiesService.getProperties();
    propertyList.push(property);
    this.http.put<Property[]>('https://booking2project.firebaseio.com/properties.json', propertyList)
    .subscribe(response => console.log(response));
  }

  getProperties() {
    return this.http.get<Property[]>('https://booking2project.firebaseio.com/properties.json');
  }
}
