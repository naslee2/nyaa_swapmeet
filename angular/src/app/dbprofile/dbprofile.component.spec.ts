import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbprofileComponent } from './dbprofile.component';

describe('DbprofileComponent', () => {
  let component: DbprofileComponent;
  let fixture: ComponentFixture<DbprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
