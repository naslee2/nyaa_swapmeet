import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbaddComponent } from './dbadd.component';

describe('DbaddComponent', () => {
  let component: DbaddComponent;
  let fixture: ComponentFixture<DbaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
