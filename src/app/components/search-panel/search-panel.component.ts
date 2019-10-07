import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { SearchInputPropertyData, PriceRange } from "src/app/data-models/property-data.model";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "b2-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.css"]
})
export class SearchPanelComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  routeParamsSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.routeParamsSubscription = this.route.queryParamMap.subscribe((paramMap: ParamMap ) => {
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

      this.searchForm = this.fb.group({
        searchTerm: [searchInputParams.searchTerm],
        dates: [searchInputParams.dates],
        numberOfGuests: [searchInputParams.numberOfGuests],
        priceRange: [searchInputParams.priceRange],
        propertyType: [searchInputParams.propertyType],
        propertyRating: [searchInputParams.propertyRating],
        meals: [searchInputParams.meals],
        facilities: [searchInputParams.facilities]
      });
    });
  }

  search() {
    this.router.navigate(["./listings"], {
      queryParams: this.searchForm.value
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
