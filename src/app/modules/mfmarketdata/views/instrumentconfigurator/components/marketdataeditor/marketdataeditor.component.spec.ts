import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketdataeditorComponent } from './marketdataeditor.component';

describe('MarketdataeditorComponent', () => {
  let component: MarketdataeditorComponent;
  let fixture: ComponentFixture<MarketdataeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketdataeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketdataeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
