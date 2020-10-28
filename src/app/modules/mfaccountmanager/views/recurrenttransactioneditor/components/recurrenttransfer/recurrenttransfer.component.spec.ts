import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransferComponent } from './recurrenttransfer.component';

describe('RecurrenttransferComponent', () => {
  let component: RecurrenttransferComponent;
  let fixture: ComponentFixture<RecurrenttransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
