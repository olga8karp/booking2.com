import { Component, Input } from '@angular/core';

@Component({
  selector: 'b2-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() propertyRating;
}
