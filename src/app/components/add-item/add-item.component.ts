import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'b2-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent {
  address = '';
  propertyType = 'hotel';
  propertyRating = 'unrated';
  numberOfGuests = '2';
  price = '0';
  meals = '';
  fileUrls: string[] = [];

  constructor(private storageService: DataStorageService) {}

  formSubmit(form: NgForm) {
    this.storageService.addProperty(form.value);
  }
}
