import { environment } from "src/environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from "./b2-routing.module";
import { AppComponent } from "./components/b2.component";
import { HeaderComponent } from "./components/header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SearchResultsComponent } from "./components/search-results/search-results.component";
import { FooterComponent } from "./components/footer/footer.component";
import { PropertyDetailsComponent } from "./components/property-details/property-details.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { SearchPanelComponent } from "./components/search-panel/search-panel.component";
import { AddNewPropertyDetailsComponent } from "./components/add-new-property/add-new-property.component";
import { DropzoneDirective } from "./directives/dropzone/dropzone.directive";
import { UploaderComponent } from "./components/utility-components/input-components/images-uploader/uploader.component";
import { UploadTaskComponent } from "./components/utility-components/input-components/images-uploader/upload-task/upload-task.component";
import { AddressInputComponent } from "./components/utility-components/input-components/address-input/address-input.component";
import { DatePickerComponent } from "./components/utility-components/input-components/date-picker/date-picker.component";
import { LoginModalComponent } from "./components/modals/login-modal/login-modal.component";
import { BookingModalComponent } from "./components/modals/booking-modal/booking-modal.component";
import { NumberOfGuestsInputComponent } from "./components/utility-components/input-components/number-of-guests-input/number-of-guests-input.component";
import { MealsInputComponent } from "./components/utility-components/input-components/meals-input/meals-input.component";
import { FacilitiesInputComponent } from "./components/utility-components/input-components/facilities-input/facilities-input.component";
import { RatingComponent } from "./components/utility-components/display-components/rating/rating.component";
import { PropertyTypeInputComponent } from "./components/utility-components/input-components/property-type-input/property-type-input.component";
import { RatingInputComponent } from "./components/utility-components/input-components/rating-input/rating-input.component";
import { PriceRangeInputComponent } from "./components/utility-components/input-components/price-range-input/price-range-input.component";
import { SearchTermInputComponent } from "./components/utility-components/input-components/search-term-input/search-term-input.component";
import { DeleteConfirmModalComponent } from './components/modals/delete-confirm-modal/delete-confirm-modal.component';
import { EditPropertyComponent } from './components/edit-property/edit-property.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    FooterComponent,
    PropertyDetailsComponent,
    PageNotFoundComponent,
    SearchPanelComponent,
    AddNewPropertyDetailsComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    AddressInputComponent,
    DatePickerComponent,
    LoginModalComponent,
    BookingModalComponent,
    NumberOfGuestsInputComponent,
    MealsInputComponent,
    FacilitiesInputComponent,
    RatingComponent,
    PropertyTypeInputComponent,
    RatingInputComponent,
    PriceRangeInputComponent,
    SearchTermInputComponent,
    DeleteConfirmModalComponent,
    EditPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientJsonpModule,
    NgxPaginationModule
  ],
  providers: [LoginModalComponent, BookingModalComponent],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, BookingModalComponent, DeleteConfirmModalComponent]
})
export class AppModule {}
