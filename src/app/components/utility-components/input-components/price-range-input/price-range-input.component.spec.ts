import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeInputComponent } from './price-range-input.component';

describe('PriceRangeInputComponent', () => {
  let component: PriceRangeInputComponent;
  let fixture: ComponentFixture<PriceRangeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriceRangeInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceRangeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
