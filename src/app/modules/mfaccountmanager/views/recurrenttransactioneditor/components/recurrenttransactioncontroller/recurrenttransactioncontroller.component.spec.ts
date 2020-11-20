import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactioncontrollerComponent } from './recurrenttransactioncontroller.component';

describe('RecurrenttransactioncontrollerComponent', () => {
  let component: RecurrenttransactioncontrollerComponent;
  let fixture: ComponentFixture<RecurrenttransactioncontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransactioncontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransactioncontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
