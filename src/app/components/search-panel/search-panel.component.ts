import { Component } from "@angular/core";
import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { SearchInputPropertyData } from "src/app/data-models/property-data.model";

@Component({
  selector: "b2-search-panel",
  templateUrl: "./search-panel.component.html",
  styleUrls: ["./search-panel.component.css"]
})
export class SearchPanelComponent {
  searchData = new SearchInputPropertyData();

  constructor(private dataService: DataStorageService) {}

  search(searchData: SearchInputPropertyData) {
    //this.dataService.getFilteredProperties(searchData).then((data) => console.log(data.docs));
    //.then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     console.log(searchData, doc.id, ' => ', doc.data());
    //   });
    // })
    //   .catch((error) => {
    //     console.log('Error getting documents: ', error);
    //   });
  }
}
