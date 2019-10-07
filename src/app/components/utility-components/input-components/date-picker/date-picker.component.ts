import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgForm } from "@angular/forms";
import { NgbDate, NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { DatePickerService } from "src/app/services/date-picker/date-picker.service";

@Component({
  selector: "b2-date-picker",
  templateUrl: "./date-picker.component.html",
  styleUrls: ["./date-picker.component.css"],
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

  constructor(
    private calendar: NgbCalendar,
    private datePickerService: DatePickerService
  ) {}

  ngOnInit() {
    this.fromDate = this.calendar.getToday();
    this.toDate = this.calendar.getNext(this.calendar.getToday(), "d", 2);
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  onDateSelection(date: NgbDate): void {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate && this.toDate) {
      const from = this.datePickerService.createDateFromNgbDate(this.fromDate);
      const to = this.datePickerService.createDateFromNgbDate(this.toDate);
      const bookedDatesArray = Array.from(
        this.datePickerService.datesBetween(from, to)
      );
      this.onChanged(bookedDatesArray || []);
      this.onTouched();
    }
  }

  isHovered(date: NgbDate): boolean {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate): boolean {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): boolean {
    return (
      date.equals(this.fromDate) ||
      date.equals(this.toDate) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  writeValue(value: Date[]): void {
    if (value.length) {
      const fromDate: any = {
        year: value[0].getFullYear(),
        month: value[0].getMonth(),
        day: value[0].getDate(),
      };
      const toDate: any = {
        year: value[value.length - 1].getFullYear(),
        month: value[value.length - 1].getMonth(),
        day: value[value.length - 1].getDate()
      };
      this.fromDate = this.calendar.getPrev(this.calendar.getNext(fromDate));
      this.toDate = this.calendar.getPrev(this.calendar.getNext(toDate));
    }
  }

  onChanged: (value: {}) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
