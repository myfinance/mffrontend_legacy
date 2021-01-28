import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentvaluedetailsviewComponent } from './instrumentvaluedetailsview.component';

describe('InstrumentvaluedetailsviewComponent', () => {
  let component: InstrumentvaluedetailsviewComponent;
  let fixture: ComponentFixture<InstrumentvaluedetailsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentvaluedetailsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentvaluedetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
