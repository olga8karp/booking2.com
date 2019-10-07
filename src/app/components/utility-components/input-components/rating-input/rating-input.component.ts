import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true
    }
  ]
})
export class RatingInputComponent implements ControlValueAccessor {
  propertyRating = 0;

  writeValue(value: number): void {
    if (value && typeof value === 'number') {
      this.propertyRating = value;
    }
  }

  onChanged: (value: number) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handlePropertyRatingSelect(propertyRating: number): void {
    this.propertyRating = propertyRating;
    this.onChanged(propertyRating);
    this.onTouched();
  }
}
