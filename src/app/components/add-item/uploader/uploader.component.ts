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
  @Output() uploadAdded = new EventEmitter<string>();
  @Output() uploadRemoved = new EventEmitter<string>();

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  writeValue(): void {
  }

  onChange = (_: any) => {};

  emitChanges() {
  }

  registerOnTouched() {}

  registerOnChange() {}

  removeUpload(fileData: { file: File, url: string }) {
    this.files = this.files.filter(f => f !== fileData.file);
    this.uploadRemoved.emit(fileData.url);
  }

  addUpload(url) {
    this.uploadAdded.emit(url);
  }
}
