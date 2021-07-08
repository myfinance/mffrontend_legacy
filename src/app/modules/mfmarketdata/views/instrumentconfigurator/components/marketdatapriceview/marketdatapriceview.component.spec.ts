import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketdatapriceviewComponent } from './marketdatapriceview.component';

describe('MarketdatapriceviewComponent', () => {
  let component: MarketdatapriceviewComponent;
  let fixture: ComponentFixture<MarketdatapriceviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketdatapriceviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketdatapriceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
