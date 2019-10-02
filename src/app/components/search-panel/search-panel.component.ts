import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { SearchInputPropertyData } from "src/app/data-models/property-data.model";

@Component({
  selector: "b2-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.css"]
})
export class SearchPanelComponent implements OnInit {
  searchData = new SearchInputPropertyData();
  searchForm: FormGroup;

  constructor(
    private dataService: DataStorageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [this.searchData.searchTerm],
      dates: [this.searchData.dates],
      numberOfGuests: [this.searchData.numberOfGuests],
      priceRange: [this.searchData.priceRange],
      propertyType: [this.searchData.propertyType],
      propertyRating: [this.searchData.propertyRating],
      meals: [this.searchData.meals],
      facilities: [this.searchData.facilities]
    });
  }

  search() {
    this.dataService.getPropertiesBySearchInputParams(this.searchForm.value);
  }
}
