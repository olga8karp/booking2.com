import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b2-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  images = ['https://cdn.pixabay.com/photo/2019/08/12/06/14/field-4400519_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/10/21/14/45/aurora-borealis-2874887_960_720.jpg',
            'https://cdn.pixabay.com/photo/2019/08/12/13/39/lisbon-4401269_960_720.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
