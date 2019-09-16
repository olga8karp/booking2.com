import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { SearchInputPropertyData } from 'src/app/data-models/property-data.model';

@Component({
  selector: 'b2-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css']
})
export class SearchPanelComponent implements OnInit {
  propertyData = new SearchInputPropertyData();

  constructor(private dataService: DataStorageService) {
  }

  ngOnInit() {}
  search(form: NgForm) {
    console.log(form);
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
