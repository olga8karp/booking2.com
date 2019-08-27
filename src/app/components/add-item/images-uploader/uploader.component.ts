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
  fileUrls: string[] = [];

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
    this.fileUrls = this.fileUrls.filter(f => f !== fileData.url);
    this.onChanged(this.fileUrls);
  }

  addUpload(url) {
    this.fileUrls.push(url);
    this.onChanged(this.fileUrls);
    this.onTouched();
  }
}
