import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddNewPropertyDetailsComponent } from "./add-new-property.component";

describe("AddNewProperty", () => {
  let component: AddNewPropertyDetailsComponent;
  let fixture: ComponentFixture<AddNewPropertyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewPropertyDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
