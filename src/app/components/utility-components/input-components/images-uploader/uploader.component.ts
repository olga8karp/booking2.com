import { Component, forwardRef } from '@angular/core';
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
  fileUrls: string[] = [];
  files: File[] = [];

  toggleHover(event: boolean): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  writeValue(value: string[]): void {
    this.fileUrls = value;
  }

  onChanged: (value: string[]) => void = () => {};

  onTouched: () => void = () => {};

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  removeUpload(fileData: { file: File; url: string }): void {
    this.files = this.files.filter(f => f !== fileData.file);
    this.fileUrls = this.fileUrls.filter(f => f !== fileData.url);
    this.onChanged(this.fileUrls || []);
  }

  addUpload(url): void {
    this.fileUrls.push(url);
    this.onChanged(this.fileUrls || []);
    this.onTouched();
  }
}
