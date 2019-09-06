import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';

@Injectable({
  providedIn: 'root'
})
export class AddItemCanDeactivateGuardService implements CanDeactivate<AddItemComponent> {
  canDeactivate(component: AddItemComponent): boolean {
    if (component.addPropertyForm.dirty && !component.addPropertyForm.submitted) {
      return confirm('Are you sure you want to discard yor changes?');
    }
    return true;
  }
}
