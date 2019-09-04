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
  id: number;
  dateRange = {};
  isCalendarOpen = false;

  constructor(private dataService: DataStorageService,  private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.dataService.getPropertyById(this.id).subscribe(property => this.property = property);
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  bookForSelectedDates(form: NgForm) {
    this.dataService.setBookedDates(this.id, form.value);
  }
}
