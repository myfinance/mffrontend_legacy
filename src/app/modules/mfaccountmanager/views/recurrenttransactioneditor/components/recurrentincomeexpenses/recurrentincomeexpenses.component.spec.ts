import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentincomeexpensesComponent } from './recurrentincomeexpenses.component';

describe('RecurrentincomeexpensesComponent', () => {
  let component: RecurrentincomeexpensesComponent;
  let fixture: ComponentFixture<RecurrentincomeexpensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentincomeexpensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentincomeexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
