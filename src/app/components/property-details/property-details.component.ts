import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";

import { DataStorageService } from "src/app/services/data-storage/data-storage.service";
import { PropertyData } from "src/app/data-models/property-data.model";
import { BookingModalComponent } from "../utility-components/modals/booking-modal/booking-modal.component";

@Component({
  selector: "b2-property-details",
  templateUrl: "./property-details.component.html",
  styleUrls: ["./property-details.component.css"]
})
export class PropertyDetailsComponent implements OnInit {
  property$: Observable<PropertyData>;
  id = "";

  constructor(
    private dataService: DataStorageService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.property$ = this.dataService.getPropertyById(this.id);
  }

  open(): void {
    const modalRef = this.modalService.open(BookingModalComponent);
    modalRef.componentInstance.propertyId = this.id;
  }
}
