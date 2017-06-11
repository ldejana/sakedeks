import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccTypeComponent } from './add-acc-type.component';

describe('AddAccTypeComponent', () => {
  let component: AddAccTypeComponent;
  let fixture: ComponentFixture<AddAccTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
