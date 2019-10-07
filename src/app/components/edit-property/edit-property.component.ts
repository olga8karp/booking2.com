import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { Router, ActivatedRoute } from "@angular/router";
import { PropertyData } from "src/app/data-models/property-data.model";
import { priceRegEx } from "src/app/constants/regex";
import { Subscription } from 'rxjs';

@Component({
  selector: 'b2-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit, OnDestroy {
  propertyId: string;
  editPropertyForm: FormGroup;
  previouslySavedUploads: string[] = [];
  deletedImages: string[] = [];
  isSubmitted = false;
  private getPropertyByIdSubscription: Subscription;

  constructor(
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.propertyId = this.route.snapshot.paramMap.get("id");
    this.getPropertyByIdSubscription = this.dataService.getPropertyById(this.propertyId).subscribe((propertyData: PropertyData) => {
    this.previouslySavedUploads = propertyData.uploads;
    propertyData.uploads = [];
    this.editPropertyForm = this.fb.group({
      name: [
        propertyData.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(300)
        ]
      ],
      propertyType: [propertyData.propertyType],
      propertyRating: [propertyData.propertyRating],
      address: [propertyData.address, [Validators.required]],
      numberOfGuests: [
        +propertyData.numberOfGuests,
        [Validators.required, Validators.min(1), Validators.max(30)]
      ],
      meals: [propertyData.meals],
      facilities: [propertyData.facilities],
      uploads: [propertyData.uploads],
      description: [
        propertyData.description,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(600)
        ]
      ],
      price: [
        propertyData.price,
        [Validators.required, Validators.pattern(priceRegEx)]
      ]
    });
  });
  }

  deleteImage(removedImageUrl: string): void {
    if (this.previouslySavedUploads.length) {
      this.previouslySavedUploads = this.previouslySavedUploads.filter((imgUrl: string) => imgUrl !== removedImageUrl);
    }
    this.deletedImages.push(removedImageUrl);
  }

  formSubmit(propertyData: PropertyData): void {
    this.isSubmitted = true;
    propertyData.uploads.unshift(...this.previouslySavedUploads);
    if (this.deletedImages.length) {
      this.deletedImages.forEach((removedImgUrl: string) => {
        propertyData.uploads = propertyData.uploads.filter((imgUrl: string) => imgUrl !== removedImgUrl);
      });
    }
    this.dataService.saveProperty(this.propertyId, propertyData);
    this.router.navigate(["./listings"], { queryParamsHandling: 'preserve' });
  }

  ngOnDestroy() {
    this.getPropertyByIdSubscription.unsubscribe();
  }
}
