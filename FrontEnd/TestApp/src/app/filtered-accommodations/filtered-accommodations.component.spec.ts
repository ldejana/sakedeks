import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredAccommodationsComponent } from './filtered-accommodations.component';

describe('FilteredAccommodationsComponent', () => {
  let component: FilteredAccommodationsComponent;
  let fixture: ComponentFixture<FilteredAccommodationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredAccommodationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredAccommodationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
