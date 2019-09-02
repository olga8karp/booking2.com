import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { reduce } from 'rxjs/operators';
import { BookedDatesRange } from 'src/app/shared/property.model';

@Component({
  selector: 'b2-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true
    }
  ]
})
export class TimePickerComponent implements OnInit, ControlValueAccessor {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  minDate: NgbDateStruct;

  @Input() unavailableDates: any;

  constructor(private calendar: NgbCalendar) { }

  ngOnInit() {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      if (this.fromDate && this.toDate) {
        this.onChanged({ fromDate: this.fromDate, toDate: this.toDate });
      }
      this.onTouched();
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  writeValue() { }

  onChanged: (value: {}) => void = () => { };

  onTouched: () => void = () => { };

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  isDisabled(date: NgbDateStruct, current: { month: number, year: number }) {
    return this.unavailableDates.find(x =>  this.deepIsEqual(new NgbDate(x.year, x.month, x.day), JSON.stringify(date))) ?
      true : false;
  }

  deepIsEqual(first, second) {
    // If first and second are the same type and have the same value
    // Useful if strings or other primitive types are compared
    // tslint:disable-next-line: curly
    if (first === second) return true;

    // Try a quick compare by seeing if the length of properties are the same
    // tslint:disable-next-line: prefer-const
    let firstProps = Object.getOwnPropertyNames(first);
    // tslint:disable-next-line: prefer-const
    let secondProps = Object.getOwnPropertyNames(second);

    // Check different amount of properties
    // tslint:disable-next-line: curly
    if (firstProps.length != secondProps.length) return false;

    // Go through properties of first object
    // tslint:disable-next-line: prefer-for-of
    for (var i = 0; i < firstProps.length; i++) {
      let prop = firstProps[i];
      // Check the type of property to perform different comparisons
      switch (typeof (first[prop])) {
        // If it is an object, decend for deep compare
        case 'object':
          // tslint:disable-next-line: curly
          if (!this.deepIsEqual(first[prop], second[prop])) return false;
          break;
        case 'number':
          // with JavaScript NaN != NaN so we need a special check
          // tslint:disable-next-line: curly
          if (isNaN(first[prop]) && isNaN(second[prop])) break;
        // tslint:disable-next-line: no-switch-case-fall-through
        default:
          // tslint:disable-next-line: curly
          if (first[prop] !== second[prop]) return false;
      }
    }
    return true;
  }
}

