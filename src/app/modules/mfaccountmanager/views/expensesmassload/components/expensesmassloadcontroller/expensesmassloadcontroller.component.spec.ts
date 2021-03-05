import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesmassloadcontrollerComponent } from './expensesmassloadcontroller.component';

describe('ExpensesmassloadcontrollerComponent', () => {
  let component: ExpensesmassloadcontrollerComponent;
  let fixture: ComponentFixture<ExpensesmassloadcontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesmassloadcontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesmassloadcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
