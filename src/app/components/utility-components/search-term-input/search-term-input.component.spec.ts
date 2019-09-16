import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTermInputComponent } from './search-term-input.component';

describe('SearchTermInputComponent', () => {
  let component: SearchTermInputComponent;
  let fixture: ComponentFixture<SearchTermInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTermInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTermInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
