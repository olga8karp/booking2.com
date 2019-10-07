import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2-meals-input',
  templateUrl: './meals-input.component.html',
  styleUrls: ['./meals-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MealsInputComponent),
      multi: true
    }
  ]
})
export class MealsInputComponent implements ControlValueAccessor {
  meals: string[] = [];

  writeValue(value: string[]): void {
    if (value && value.length) {
      this.meals = value;
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

  handleMealsUpdate(meal: string): void {
    if (this.meals.includes(meal)) {
      this.meals = this.meals.filter(m => m !== meal);
    } else {
      this.meals.push(meal);
    }
    this.onChanged(this.meals);
    this.onTouched();
  }
}
