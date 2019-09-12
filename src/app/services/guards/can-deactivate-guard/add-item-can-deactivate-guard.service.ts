import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AddNewPropertyComponent } from '../../../components/add-new-property/add-new-property.component';

@Injectable({
  providedIn: 'root'
})
export class AddItemCanDeactivateGuardService implements CanDeactivate<AddNewPropertyComponent> {
  canDeactivate(component: AddNewPropertyComponent): boolean {
    if (component.addPropertyForm.dirty && !component.addPropertyForm.submitted) {
      return confirm('Are you sure you want to discard yor changes?');
    }
    return true;
  }
}
