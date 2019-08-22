import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppRoutingModule } from './b2-routing.module';
import { AppComponent } from './b2.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FooterComponent } from './footer/footer.component';
import { PropertyComponent } from './property/property.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchPanelComponent } from './search-panel/search-panel.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    SearchResultsComponent,
    FooterComponent,
    PropertyComponent,
    PageNotFoundComponent,
    SearchPanelComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    GooglePlaceModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAsSV524BTbeHlm5VYiFhcRgBPtNtTSOmQ',
      authDomain: 'booking2project.firebaseapp.com',
      storageBucket: 'booking2project.appspot.com',
      projectId: 'booking2project'
    }),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
