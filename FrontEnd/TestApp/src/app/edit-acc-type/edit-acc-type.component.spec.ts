import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccTypeComponent } from './edit-acc-type.component';

describe('EditAccTypeComponent', () => {
  let component: EditAccTypeComponent;
  let fixture: ComponentFixture<EditAccTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
