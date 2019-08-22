import { Component, OnInit } from '@angular/core';

import { Property } from '../../shared/property.model';
import { DataStorageService } from '../../services/data-storage.service';


@Component({
  selector: 'b2-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  properties: Property[] = [];

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getProperties().subscribe(properties => this.properties = properties);
  }

}