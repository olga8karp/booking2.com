import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'b2-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  property;
  id: string;
  dateRange = {};
  isCalendarOpen = false;
  unavailableDates;

  constructor(private dataService: DataStorageService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getPropertyById(this.id).subscribe(property => {
      this.property = property;
      // this.unavailableDates = this.property.bookedDates.length ?
      // this.property.bookedDates.forEach(bookedDates => {
      //   console.log(bookedDates);
      // }) : [];

      //   utcDate = utcDate.toDate();
      //   return { day: utcDate.getUTCDay(), month: utcDate.getUTCMonth() + 1, year: utcDate.getUTCFullYear() };
      // }) : [];
    });
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  bookForSelectedDates(form: NgForm) {
    this.dataService.setBookedDates(this.id, form.value);
  }
}
