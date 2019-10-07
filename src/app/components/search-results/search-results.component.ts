import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PropertyData, SearchInputPropertyData, PriceRange } from 'src/app/data-models/property-data.model';
import { DataStorageService } from 'src/app/services/data-storage/data-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/data-models/user.model';
import { AdminUserId } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmModalComponent } from '../modals/delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'b2-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  properties: PropertyData[] = null;
  visitedPropertyId: number;
  displayLoadingMessage = true;
  isAdmin: Observable<boolean>;
  routeParamsSubscription: Subscription;
  p: MouseEvent;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataStorageService,
    private modalService: NgbModal,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.routeParamsSubscription = this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const searchInputParams = new SearchInputPropertyData(
        paramMap.getAll('facilities') || [],
        paramMap.getAll('meals') || [],
        +paramMap.get('numberOfGuests') || 2,
        (paramMap.getAll('priceRange').map((num: string): number => +num) as PriceRange) || null,
        +paramMap.get('propertyRating') || 0,
        paramMap.get('propertyType') || null,
        paramMap.getAll('dates').map((date: string) => new Date(date)) || [],
        paramMap.get('searchTerm') || ''
      );
      this.dataService.getPropertiesBySearchInputParams(searchInputParams);
    });
    this.checkUserId();
    this.dataService.properties$.subscribe((props: PropertyData[]) => (this.properties = props));
    this.visitedPropertyId = +this.route.snapshot.paramMap.get('lastVisited');
  }

  checkUserId(): void {
    this.isAdmin = this.auth.user$.pipe(
      map((user: User) => {
        if (user) {
          return user.uid === AdminUserId;
        }
      })
    );
  }

  deleteProperty(propertyId: string): void {
    const modalRef = this.modalService.open(DeleteConfirmModalComponent);
    modalRef.componentInstance.propertyId = propertyId;
    modalRef.componentInstance.isDeleted.subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.properties = this.properties.filter(
          (property: PropertyData) => property.timestamp.toString() !== propertyId
        );
      }
      modalRef.close();
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
