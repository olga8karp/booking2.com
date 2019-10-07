import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ImagesUploaderService } from 'src/app/services/images-uploader/images-uploader.service';

@Component({
  selector: 'b2-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {
  @Input() file: File;
  @Output() uploadAdded = new EventEmitter<string>();
  @Output() uploadRemoved = new EventEmitter<{ file: File; url: string }>();

  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(private imagesUploaderService: ImagesUploaderService) {}

  ngOnInit() {
    this.startUpload();
  }

  startUpload(): void {
    this.snapshot = this.imagesUploaderService.startUpload(this.file).pipe(
      finalize(async () => {
        this.downloadURL = await this.imagesUploaderService.addDownloadUrl();
        this.uploadAdded.emit(this.downloadURL);
      })
    );
  }

  isActive(snapshot): boolean {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  delete(event: Event, downloadURL: string): boolean {
    this.imagesUploaderService.deleteFile(downloadURL);
    this.uploadRemoved.emit({ file: this.file, url: this.downloadURL });
    event.preventDefault();
    return false;
  }
}
