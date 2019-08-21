import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


declare var google: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {
  address = [];
  // setting default values
  propertyType = 'hotel';
  propertyRating = 'unrated';
  numberOfGuests = '2';
  price = '0';
  meals = '';

  constructor() { }

  ngOnInit() {}

  handleAddressChange($event) {
    this.address = $event.address_components;
  }

  formSubmit(form: NgForm) {
    form.value.address = this.address;
    console.log(form.value);
  }
}
