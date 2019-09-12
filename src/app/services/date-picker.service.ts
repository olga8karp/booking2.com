import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DatePickerService {
  createDateFromNgbDate(ngbDate: NgbDateStruct): Date {
    return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
  }

  cloneDate(date: Date): Date {
    return new Date(date.valueOf());
  }

  incrementDate(date: Date, amount: number): Date {
    date.setDate(date.getDate() + this.defaultValue(amount, 1));
    return date;
  }

  defaultValue(value: number, valueDefault: number): number {
    return (typeof value === 'undefined' ? valueDefault : value);
  }

  *datesBetween(startDate: Date, endDate: Date): IterableIterator<Date> {
    startDate = startDate || new Date();
    endDate = endDate || startDate;
    const current = this.incrementDate(this.cloneDate(startDate), -1);
    while (current < endDate) {
      yield this.cloneDate(this.incrementDate(current, undefined));
    }
  }
}
