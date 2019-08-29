import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './b2-routing.module';
import { AppComponent } from './components/b2.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FooterComponent } from './components/footer/footer.component';
import { PropertyComponent } from './components/property/property.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DropzoneDirective } from './directives/dropzone/dropzone.directive';
import { UploaderComponent } from './components/add-item/images-uploader/uploader.component';
import { UploadTaskComponent } from './components/add-item/images-uploader/upload-task/upload-task.component';
import { AddressInputComponent } from './components/add-item/address-input/address-input.component';

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
    AddItemComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    AddressInputComponent
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
      databaseURL: 'https://booking2project.firebaseio.com',
      projectId: 'booking2project',
      storageBucket: 'booking2project.appspot.com',
      messagingSenderId: '186972044950',
      appId: '1:186972044950:web:2b7699158f0780ff'
    }),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
