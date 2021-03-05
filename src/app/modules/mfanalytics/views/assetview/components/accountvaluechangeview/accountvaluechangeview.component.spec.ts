import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountValueChangeViewComponent } from './accountvaluechangeview.component';

describe('AccountValueChangeViewComponent', () => {
  let component: AccountValueChangeViewComponent;
  let fixture: ComponentFixture<AccountValueChangeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountValueChangeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountValueChangeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
