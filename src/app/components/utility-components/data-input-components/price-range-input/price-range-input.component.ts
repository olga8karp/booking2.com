import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { PriceRange } from "src/app/data-models/property-data.model";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: "b2-price-range-input",
  templateUrl: "./price-range-input.component.html",
  styleUrls: ["./price-range-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceRangeInputComponent),
      multi: true
    }
  ]
})
export class PriceRangeInputComponent implements ControlValueAccessor {
  priceRangeSubject = new BehaviorSubject<PriceRange>(null);
  priceRange = this.priceRangeSubject.asObservable();

  writeValue(value: PriceRange): void {
    this.priceRangeSubject.next(value);
  }

  onChanged: (value: [number, number]) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handlePriceRangeSelect(newRange: PriceRange): void {
      this.priceRangeSubject.next(newRange);
      this.onChanged(newRange);
      this.onTouched();
  }
}
