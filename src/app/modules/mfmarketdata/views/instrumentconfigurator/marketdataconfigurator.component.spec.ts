import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDataConfiguratorComponent } from './marketdataconfigurator.component';

describe('InstrumentconfiguratorComponent', () => {
  let component: MarketDataConfiguratorComponent;
  let fixture: ComponentFixture<MarketDataConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDataConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDataConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
