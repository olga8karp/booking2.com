import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ImagesUploaderService {
  ref: AngularFireStorageReference;
  path: string;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  downloadUrl: string;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) {}

  async addDownloadUrl(): Promise<string> {
    this.downloadUrl = await this.ref.getDownloadURL().toPromise();
    this.db.collection('files').add({
      downloadURL: this.downloadUrl,
      path: this.path
    });
    return this.downloadUrl;
  }

  startUpload(file: File): Observable<UploadTaskSnapshot> {
    this.path = `file/${Date.now()}_${file.name}`;
    this.ref = this.storage.ref(this.path);
    this.task = this.storage.upload(this.path, file);
    this.percentage = this.task.percentageChanges();
    return this.task.snapshotChanges();
  }

  deleteFile(downloadURL: string): void {
    this.storage.storage
      .refFromURL(downloadURL)
      .delete()
      .catch((error: Error) => console.log(error.message));
  }
}
