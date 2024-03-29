import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddNewPropertyDetailsComponent } from './components/add-new-property/add-new-property.component';
import { AddItemCanDeactivateGuardService } from './services/guards/can-deactivate-guard/add-item-can-deactivate-guard.service';
import { AddItemCanActivateGuardService } from './services/guards/can-activate-guard/add-item-can-activate-guard.service';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';

const routes: Routes = [
  { path: 'listings', component: SearchResultsComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  {
    path: 'add',
    component: AddNewPropertyDetailsComponent,
    canActivate: [AddItemCanActivateGuardService],
    canDeactivate: [AddItemCanDeactivateGuardService]
  },
  {
    path: 'edit/:id',
    component: EditPropertyComponent,
    canActivate: [AddItemCanActivateGuardService],
    canDeactivate: [AddItemCanDeactivateGuardService]
  },
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
