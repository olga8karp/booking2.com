import { Component, forwardRef, OnDestroy } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { PropertyData } from "src/app/data-models/property-data.model";

@Component({
  selector: "b2-search-term-input",
  templateUrl: "./search-term-input.component.html",
  styleUrls: ["./search-term-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchTermInputComponent),
      multi: true
    }
  ]
})
export class SearchTermInputComponent
  implements ControlValueAccessor, OnDestroy {
  searchTerm: string;
  model: any;
  availablePropertiesNamesAndAddresses: string[];
  dataServiceSubscription: Subscription;

  constructor(private dataService: DataStorageService) {
    this.dataServiceSubscription = this.dataService
      .properties$
      .subscribe((properties: PropertyData[]) => {
        this.availablePropertiesNamesAndAddresses = properties.reduce(
          (acc: string[], property: PropertyData): string[] => {
            acc.push(property.name);
            acc.push(property.address);
            return acc;
          },
          []
        );
      });
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term: string) =>
        term.length < 2
          ? []
          : this.availablePropertiesNamesAndAddresses
              .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)
      )
    );

  writeValue(value: string): void {
    if (value) {
      this.searchTerm = value;
    }
  }

  onChanged: (value: string) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleSearchTermInput(newTerm: string): void {
    this.searchTerm = newTerm;
    this.onChanged(this.searchTerm);
    this.onTouched();
  }

  ngOnDestroy() {
    this.dataServiceSubscription.unsubscribe();
  }
}
