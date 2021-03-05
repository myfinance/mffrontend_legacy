import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesmassloadComponent } from './expensesmassload.component';

describe('ExpensesmassloadComponent', () => {
  let component: ExpensesmassloadComponent;
  let fixture: ComponentFixture<ExpensesmassloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesmassloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesmassloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
