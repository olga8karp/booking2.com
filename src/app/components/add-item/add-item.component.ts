import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'b2-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent {
  @ViewChild('addPropertyForm', { static: false }) public addPropertyForm: NgForm;
  name = '';
  address = '';
  propertyType = 'hotel';
  propertyRating = 'unrated';
  numberOfGuests = '2';
  price = '0';
  meals = '';
  fileUrls: string[] = [];
  description = '';

  constructor(private storageService: DataStorageService, private router: Router) {}

  formSubmit(form: NgForm) {
    this.storageService.addProperty(form.value);
    this.router.navigateByUrl('listings');
  }
}
