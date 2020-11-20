import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactioncreatorComponent } from './recurrenttransactioncreator.component';

describe('RecurrenttransactioncreatorComponent', () => {
  let component: RecurrenttransactioncreatorComponent;
  let fixture: ComponentFixture<RecurrenttransactioncreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransactioncreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransactioncreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
