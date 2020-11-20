import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactionviewComponent } from './recurrenttransactionview.component';

describe('RecurrenttransactionviewComponent', () => {
  let component: RecurrenttransactionviewComponent;
  let fixture: ComponentFixture<RecurrenttransactionviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransactionviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransactionviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
