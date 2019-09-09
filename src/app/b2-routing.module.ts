import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './components/property/property.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { AddItemCanDeactivateGuardService } from './components/add-item-can-deactivate-guard.service';
import { AuthComponent } from './components/auth/auth.component';
import { AddItemCanActivateGuardService } from './add-item-can-activate-guard.service';

const routes: Routes = [
  { path: 'listings', component: SearchResultsComponent },
  { path: 'property/:id', component: PropertyComponent },
  { path: 'add', component: AddItemComponent,
  canActivate: [AddItemCanActivateGuardService],
  canDeactivate: [AddItemCanDeactivateGuardService] },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'listings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
