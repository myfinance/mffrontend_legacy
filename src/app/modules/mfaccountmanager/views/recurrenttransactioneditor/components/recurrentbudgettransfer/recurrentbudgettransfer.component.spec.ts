import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentbudgettransferComponent } from './recurrentbudgettransfer.component';

describe('RecurrentbudgettransferComponent', () => {
  let component: RecurrentbudgettransferComponent;
  let fixture: ComponentFixture<RecurrentbudgettransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentbudgettransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentbudgettransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
