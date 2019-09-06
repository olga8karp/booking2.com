import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
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
  goToPrevDisabled = false;
  goToNextDisabled = false;

  constructor(private dataService: DataStorageService,
    private router: Router, private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe((routeParams: ParamMap) => {
      this.id = routeParams.get('id');
      this.dataService.getPropertyById(this.id).subscribe((prop: Property) => {
        this.property = prop;
      });
    });
  }

  toggleCalendar(): void {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  bookForSelectedDates(form: NgForm): void {
    this.dataService.setBookedDates(this.id, form.value);
  }

  goToPrevious(id: number): void {
    this.firestore.collection('properties', ref => ref
      .orderBy('timestamp', 'asc')
      .startAfter(id)
      .limit(2)
    ).get()
      .subscribe(response => {
        this.goToNextDisabled = false;
        if (!response.docs[1]) {
          this.goToPrevDisabled = true;
        }
        if (response.docs[0]) {
          this.router.navigateByUrl(`property/${response.docs[0].get('timestamp')}`);
        } else {
          this.goToPrevDisabled = true;
        }
      });
  }

  goToNext(id: number): void {
    this.firestore.collection('properties', ref => ref
      .orderBy('timestamp', 'desc')
      .startAfter(id)
      .limit(2)
    ).get()
      .subscribe(response => {
        this.goToPrevDisabled = false;
        if (!response.docs[1]) {
          this.goToNextDisabled = true;
        }
        if (response.docs[0]) {
          this.router.navigateByUrl(`property/${response.docs[0].get('timestamp')}`);
        } else {
          this.goToNextDisabled = true;
        }
      });
  }
}
