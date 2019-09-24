import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { Observable } from "rxjs";
import { PropertyData } from "src/app/data-models/property-data.model";
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
    this.properties$ = this.dataService.properties$.pipe(shareReplay());
    this.visitedPropertyId = +this.route.snapshot.paramMap.get("lastVisited");
  }

  prevPage() {
    this.dataService.prevPage();
  }

  nextPage() {
    this.dataService.nextPage();
  }
}
