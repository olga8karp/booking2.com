import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2-number-of-guests-input',
  templateUrl: './number-of-guests-input.component.html',
  styleUrls: ['./number-of-guests-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberOfGuestsInputComponent),
      multi: true
    }
  ]
})
export class NumberOfGuestsInputComponent implements ControlValueAccessor {
  numberOfGuests = 2;

  writeValue(value: number): void {
    if (value && typeof value === 'number') {
      this.numberOfGuests = value;
    }
  }

  onChanged: (value: number) => void = () => { };

  onTouched: () => void = () => { };

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleAddressSelect(): void {
    this.onChanged(this.numberOfGuests);
    this.onTouched();
  }
}
