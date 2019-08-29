import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyComponent } from './components/property/property.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddItemComponent } from './components/add-item/add-item.component';

const routes: Routes = [
  { path: 'listings', component: SearchResultsComponent },
  { path: 'property/:id', component: PropertyComponent },
  { path: 'add', component: AddItemComponent },
  { path: '', redirectTo: '/listings', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
