import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataStorageService } from '../shared/data-storage.service';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


declare var google: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit {
  address = [];
  // setting default values
  propertyType = 'hotel';
  propertyRating = 'unrated';
  numberOfGuests = '2';
  price = '0';
  meals = '';
  ref: AngularFireStorageReference;
  downloadURL: Observable<string>;
  task: any;
  uploadState: any;

  constructor(private dataStorageService: DataStorageService, private afStorage: AngularFireStorage) { }
  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.downloadURL = url;
        });
      })
    ).subscribe();
  }

  ngOnInit() { }

  handleAddressChange($event) {
    this.address = $event.address_components;
  }

  formSubmit(form: NgForm) {
    form.value.address = this.address;
    form.value.file1 = this.downloadURL;
    this.dataStorageService.addProperty(form.value);
  }
}
