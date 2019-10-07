import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsInputComponent } from './meals-input.component';

describe('MealsInputComponent', () => {
  let component: MealsInputComponent;
  let fixture: ComponentFixture<MealsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MealsInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
