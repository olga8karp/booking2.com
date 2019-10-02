import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { Router } from "@angular/router";
import { PropertyData } from "src/app/data-models/property-data.model";
import { priceRegEx } from "src/app/constants/regex";

@Component({
  selector: "b2-add-new-property",
  templateUrl: "./add-new-property.component.html",
  styleUrls: ["./add-new-property.component.css"]
})
export class AddNewPropertyDetailsComponent implements OnInit {
  addPropertyForm: FormGroup;
  isSubmitted = false;
  propertyData = new PropertyData();
  constructor(
    private storageService: DataStorageService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.addPropertyForm = this.fb.group({
      name: [
        this.propertyData.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      ],
      propertyType: [this.propertyData.propertyType],
      propertyRating: [this.propertyData.propertyRating],
      address: [this.propertyData.address, [Validators.required]],
      numberOfGuests: [
        this.propertyData.numberOfGuests,
        [Validators.required, Validators.min(1), Validators.max(30)]
      ],
      meals: [this.propertyData.meals],
      facilities: [this.propertyData.facilities],
      uploads: [this.propertyData.uploads],
      description: [
        this.propertyData.description,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(600)
        ]
      ],
      price: [
        this.propertyData.price,
        [Validators.required, Validators.pattern(priceRegEx)]
      ]
    });
  }

  formSubmit(propertyData: PropertyData): void {
    this.isSubmitted = true;
    this.storageService.addProperty(propertyData);
    this.router.navigateByUrl("listings");
  }
}
