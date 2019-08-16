import { Component, OnInit } from '@angular/core';


declare var google: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {
  address = [];

  constructor() { }

  ngOnInit() {}

  handleAddressChange($event) {
    this.address = $event.address_components;
    console.log(this.address);
  }
}
