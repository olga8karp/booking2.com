import { Component, OnInit } from '@angular/core';
import { Property } from '../property.model';
import { PropertiesService } from '../properties.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  properties: Property[] = [];

  constructor(private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.properties = this.propertiesService.getProperties();
  }

}
