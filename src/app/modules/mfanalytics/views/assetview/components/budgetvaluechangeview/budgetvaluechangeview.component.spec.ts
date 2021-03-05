import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetValueChangeViewComponent } from './budgetvaluechangeview.component';

describe('BudgetValueChangeViewComponent', () => {
  let component: BudgetValueChangeViewComponent;
  let fixture: ComponentFixture<BudgetValueChangeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetValueChangeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetValueChangeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
