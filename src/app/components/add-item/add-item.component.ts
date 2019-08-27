import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'b2-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent {
  address = [];
  propertyType = 'hotel';
  propertyRating = 'unrated';
  numberOfGuests = '2';
  price = '0';
  meals = '';
  uploads: string[] = [];

  handleAddressChange($event) {
    this.address = $event.address_components;
  }

  formSubmit(form: NgForm) {
    form.value.address = this.address;
    console.log(form.value);
  }

  addUpload(addedUrl) {
    this.uploads.push(addedUrl);
  }

  removeUpload(deletedUrl) {
    this.uploads = this.uploads.filter(url => url !== deletedUrl);
  }
}
