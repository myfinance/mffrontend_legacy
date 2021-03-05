import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetValueViewComponent } from './budgetvalueview.component';

describe('AssetdetailsviewComponent', () => {
  let component: BudgetValueViewComponent;
  let fixture: ComponentFixture<BudgetValueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetValueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetValueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
