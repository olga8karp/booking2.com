import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';

@Component({
  selector: 'b2-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
  styleUrls: ['./delete-confirm-modal.component.css']
})
export class DeleteConfirmModalComponent {
  @Input() propertyId: string;
  @Output() isDeleted: EventEmitter<boolean> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal, private dataService: DataStorageService) { }

  deleteProperty() {
    this.dataService.deleteProperty(this.propertyId);
    this.isDeleted.emit(true);
  }
}
