import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfGuestsInputComponent } from './number-of-guests-input.component';

describe('NumberOfGuestsInputComponent', () => {
  let component: NumberOfGuestsInputComponent;
  let fixture: ComponentFixture<NumberOfGuestsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumberOfGuestsInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfGuestsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
