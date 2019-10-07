import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2-facilities-input',
  templateUrl: './facilities-input.component.html',
  styleUrls: ['./facilities-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FacilitiesInputComponent),
      multi: true
    }
  ]
})
export class FacilitiesInputComponent implements ControlValueAccessor {
  facilities: string[] = [];

  writeValue(value: string[]): void {
    if (value && value.length) {
      this.facilities = value;
    }
  }

  onChanged: (value: string[]) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleFacilitiesUpdate(fac: string): void {
    if (this.facilities.includes(fac)) {
      this.facilities = this.facilities.filter(m => m !== fac);
    } else {
      this.facilities.push(fac);
    }
    this.onChanged(this.facilities);
    this.onTouched();
  }
}
