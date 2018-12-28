import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuylistingComponent } from './buylisting.component';

describe('BuylistingComponent', () => {
  let component: BuylistingComponent;
  let fixture: ComponentFixture<BuylistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuylistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuylistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
