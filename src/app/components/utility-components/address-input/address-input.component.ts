import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Address } from 'src/app/shared/property.model';

@Component({
  selector: 'b2-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true
    }
  ]
})

export class AddressInputComponent implements ControlValueAccessor {
  address = '';

  writeValue(value: string): void {
    if (value && typeof value === 'string') {
      this.address = value;
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

  handleAddressSelect(address: Address): void {
    this.onChanged(address.formatted_address);
    this.onTouched();
  }
}
