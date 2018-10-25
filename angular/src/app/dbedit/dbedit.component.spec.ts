import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbeditComponent } from './dbedit.component';

describe('DbeditComponent', () => {
  let component: DbeditComponent;
  let fixture: ComponentFixture<DbeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
