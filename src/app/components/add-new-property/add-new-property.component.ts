import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { Router } from '@angular/router';
import { PropertyData } from 'src/app/shared/property.model';

@Component({
  selector: 'b2-add-new-property',
  templateUrl: './add-new-property.component.html',
  styleUrls: ['./add-new-property.component.css']
})

export class AddNewPropertyComponent {
  // Needed for AddItemCanDeactivateGuardService
  @ViewChild('addPropertyForm', { static: false }) public addPropertyForm: NgForm;

  propertyData = new PropertyData();
  constructor(private storageService: DataStorageService, private router: Router) {}

  formSubmit(propertyData: PropertyData): void {
    this.storageService.addProperty(propertyData);
    this.router.navigateByUrl('listings');
  }
}
