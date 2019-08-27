import { Component, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'b2-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploaderComponent),
      multi: true
    }
  ]
})

export class UploaderComponent implements ControlValueAccessor {
  isHovering: boolean;
  files: File[] = [];
  uploads: string[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  writeValue() {}

  onChanged: (value: string[]) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any) {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  removeUpload(fileData: { file: File, url: string }) {
    this.files = this.files.filter(f => f !== fileData.file);
    this.uploads = this.uploads.filter(f => f !== fileData.url);
    this.onChanged(this.uploads);
  }

  addUpload(url) {
    this.uploads.push(url);
    this.onChanged(this.uploads);
    this.onTouched();
  }
}
