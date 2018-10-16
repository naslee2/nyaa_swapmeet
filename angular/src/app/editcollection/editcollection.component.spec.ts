import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcollectionComponent } from './editcollection.component';

describe('EditcollectionComponent', () => {
  let component: EditcollectionComponent;
  let fixture: ComponentFixture<EditcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
