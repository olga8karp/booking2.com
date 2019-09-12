import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'b2-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Output() uploadAdded = new EventEmitter<string>();
  @Output() uploadRemoved = new EventEmitter<{ file: File, url: string }>();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload(): void {
    const path = `file/${Date.now()}_${this.file.name}`;
    const ref = this.storage.ref(path);
    this.task = this.storage.upload(path, this.file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(
      finalize(async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();
        this.db.collection('files').add({
          downloadURL: this.downloadURL, path
        });
        this.uploadAdded.emit(this.downloadURL);
      }),
    );
  }

  isActive(snapshot): boolean {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  delete(event: Event, downloadURL: string): boolean {
    this.storage.storage.refFromURL(downloadURL).delete();
    this.uploadRemoved.emit({ file: this.file, url: this.downloadURL });
    event.preventDefault();
    return false;
  }
}
