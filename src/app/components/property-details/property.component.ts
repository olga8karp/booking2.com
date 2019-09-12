import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { PropertyData } from 'src/app/shared/property.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingModalComponent } from '../modals/booking-modal/booking-modal.component';

@Component({
  selector: 'b2-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  property: PropertyData;
  id = '';
  goToPrevDisabled = false;
  goToNextDisabled = false;

  constructor(private dataService: DataStorageService,
              private route: ActivatedRoute,
              private modalService: NgbModal) {}

  ngOnInit() {
    this.route.paramMap.subscribe((routeParams: ParamMap) => {
      this.id = routeParams.get('id');
      this.dataService.getPropertyById(this.id).subscribe((prop: PropertyData) => {
        this.property = prop;
      });
    });
  }

  open() {
    const modalRef = this.modalService.open(BookingModalComponent);
    modalRef.componentInstance.propertyId = this.id;
  }
}
