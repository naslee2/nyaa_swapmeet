import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistingComponent } from './viewlisting.component';

describe('ViewlistingComponent', () => {
  let component: ViewlistingComponent;
  let fixture: ComponentFixture<ViewlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
