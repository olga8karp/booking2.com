import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

import { AddNewPropertyDetailsComponent } from "../../../components/add-new-property/add-new-property.component";

@Injectable({
  providedIn: "root"
})
export class AddItemCanDeactivateGuardService
  implements CanDeactivate<AddNewPropertyDetailsComponent> {
  canDeactivate(component: AddNewPropertyDetailsComponent): boolean {
    if (
      component.addPropertyForm.dirty &&
      !component.isSubmitted
    ) {
      return confirm("Are you sure you want to discard yor changes?");
    }
    return true;
  }
}
