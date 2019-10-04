import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { Observable } from "rxjs";
import { PropertyData, SearchInputPropertyData, PriceRange } from "src/app/data-models/property-data.model";
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: "b2-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  properties$: Observable<PropertyData[]> = null;
  visitedPropertyId: number;
  displayLoadingMessage = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((paramMap: ParamMap ) => {
      const searchInputParams = new SearchInputPropertyData(
        paramMap.getAll('facilities') || [],
        paramMap.getAll('meals') || [],
        +paramMap.get('numberOfGuests') || 2,
        paramMap.getAll('priceRange').map((num: string): number => +num) as PriceRange || null,
        +paramMap.get('propertyRating') || 0,
        paramMap.get('propertyType') || null,
        paramMap.getAll('dates').map((date: string) => new Date(date)) || [],
        paramMap.get('searchTerm') || ''
      );
      this.dataService.getPropertiesBySearchInputParams(searchInputParams);
    });
    this.properties$ = this.dataService.properties$.pipe(shareReplay());
    this.visitedPropertyId = +this.route.snapshot.paramMap.get("lastVisited");
  }
}
