import { Component, OnInit } from '@angular/core';

import { DataStorageService } from '../../services/data-storage.service';


@Component({
  selector: 'b2-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  properties = this.dataStorageService.properties;

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

}
