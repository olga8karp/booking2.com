import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { NgForm } from '@angular/forms';
import { Property } from 'src/app/shared/property.model';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'b2-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  property: Property;
  id: string;
  dateRange = {};
  isCalendarOpen = false;

  constructor(private dataService: DataStorageService,
              private router: Router, private route: ActivatedRoute,
              private firestore: AngularFirestore) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getPropertyById(this.id).subscribe((property: Property) => this.property = property);
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  bookForSelectedDates(form: NgForm): void {
    this.dataService.setBookedDates(this.id, form.value);
  }

  goToPrevious(): void {
    this.firestore.collection('properties', ref => ref
    .orderBy('timestamp', 'asc')
    .startAfter(this.id)
    .limit(1)
  ).get()
    .subscribe(response => {
      console.log(response.docs);
      // this.router.navigateByUrl('property');
    });
  }

  goToNext(): void {
    this.firestore.collection('properties', ref => ref
    .orderBy('timestamp', 'desc')
    .startAfter(this.id)
    .limit(2)
  ).get()
    .subscribe(response => {
      console.log(response.docs[0].get('timestamp'));
      this.router.navigateByUrl(`property/${response.docs[0].get('timestamp')}`);
    });
  }
}
