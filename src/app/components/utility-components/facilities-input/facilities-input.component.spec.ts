import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitiesInputComponent } from './facilities-input.component';

describe('FacilitiesInputComponent', () => {
  let component: FacilitiesInputComponent;
  let fixture: ComponentFixture<FacilitiesInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacilitiesInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilitiesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
