import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "b2-property-type-input",
  templateUrl: "./property-type-input.component.html",
  styleUrls: ["./property-type-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PropertyTypeInputComponent),
      multi: true
    }
  ]
})
export class PropertyTypeInputComponent implements ControlValueAccessor {
  @Input() propertyType: string = null;

  writeValue(value: string): void {
    if (value && typeof value === "string") {
      this.propertyType = value;
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

  handlePropertyTypeSelect(propertyType: string): void {
    this.propertyType = propertyType;
    this.onChanged(propertyType);
    this.onTouched();
  }
}
