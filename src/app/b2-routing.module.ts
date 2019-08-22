import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './property/property.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: 'listings', component: SearchResultsComponent },
  { path: 'details', component: PropertyComponent },
  { path: 'add', component: AddItemComponent },
  { path: '', redirectTo: '/listings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
