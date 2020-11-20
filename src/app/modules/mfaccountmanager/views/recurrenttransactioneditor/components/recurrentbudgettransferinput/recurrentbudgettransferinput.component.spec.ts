import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentbudgettransferinputComponent } from './recurrentbudgettransferinput.component';

describe('RecurrentbudgettransferComponent', () => {
  let component: RecurrentbudgettransferinputComponent;
  let fixture: ComponentFixture<RecurrentbudgettransferinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentbudgettransferinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentbudgettransferinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
