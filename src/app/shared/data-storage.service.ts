import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { PropertiesService } from '../properties.service';
import { Property } from './property.model';
import { pipe } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private propertiesService: PropertiesService) {}

  addProperty(property: Property) {
    this.getProperties().pipe(switchMap((properties: Property[]) => {
      properties.push(property);
      return this.http.put<Property[]>('https://booking2project.firebaseio.com/properties.json', properties);
    })).subscribe(response => console.log(response));
  }

  getProperties() {
    return this.http.get<Property[]>('https://booking2project.firebaseio.com/properties.json');
  }
}
