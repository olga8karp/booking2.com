import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeInputComponent } from './property-type-input.component';

describe('PropertyTypeInputComponent', () => {
  let component: PropertyTypeInputComponent;
  let fixture: ComponentFixture<PropertyTypeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyTypeInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
