import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPropertyComponent } from './add-new-property.component';

describe('AddNewProperty', () => {
  let component: AddNewPropertyComponent;
  let fixture: ComponentFixture<AddNewPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
