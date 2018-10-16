import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbcontrolComponent } from './dbcontrol.component';

describe('DbcontrolComponent', () => {
  let component: DbcontrolComponent;
  let fixture: ComponentFixture<DbcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
