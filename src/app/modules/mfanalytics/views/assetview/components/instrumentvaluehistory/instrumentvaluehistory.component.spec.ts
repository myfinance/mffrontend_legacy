import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentvaluehistoryComponent } from './instrumentvaluehistory.component';

describe('InstrumentvaluehistoryComponent', () => {
  let component: InstrumentvaluehistoryComponent;
  let fixture: ComponentFixture<InstrumentvaluehistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentvaluehistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentvaluehistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
