import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'b2-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  minDate: NgbDateStruct;

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
      const from = this.createDateFromNgbDate(this.fromDate);
      const to = this.createDateFromNgbDate(this.toDate);
      const bookedDatesArray = Array.from(this.datesBetween(from, to));
      this.onChanged(bookedDatesArray);
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

  private createDateFromNgbDate(ngbDate: NgbDateStruct): Date {
    return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
  }

  *datesBetween(startDate, endDate) {
    startDate = startDate || new Date();
    endDate = endDate || startDate;
    const current = this.incrementDate(this.cloneDate(startDate), -1);
    while (current < endDate) {
      yield this.cloneDate(this.incrementDate(current, undefined));
    }
  }

  cloneDate(date) {
    return new Date(date.valueOf());
  }

  incrementDate(date, amount) {
    date.setDate(date.getDate() + this.defaultValue(amount, 1));
    return date;
  }

  defaultValue(value, valueDefault) {
    return (typeof value === 'undefined' ? valueDefault : value);
  }
}

