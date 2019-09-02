import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'b2-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  numberOfGuests = '2';
  dateRange = {};
  unavailableDates$;

  constructor(private dataService: DataStorageService) {
  }

  ngOnInit() {
    this.unavailableDates$ = this.dataService.unavailableDates.asObservable();
  }
  search(form: NgForm) {
    this.dataService.getFilteredProperties(form.value).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(form.value, doc.id, ' => ', doc.data());
      });
    })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }
}
