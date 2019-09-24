import { Component, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { PriceRange } from "src/app/data-models/property-data.model";

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
  priceRange: PriceRange = null;

  writeValue(value: PriceRange): void {
      this.priceRange = value;
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
      this.priceRange = newRange;
      this.onChanged(this.priceRange);
      this.onTouched();
  }
}
