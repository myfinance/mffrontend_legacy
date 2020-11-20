import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransferinputComponent } from './recurrenttransferinput.component';

describe('RecurrenttransferComponent', () => {
  let component: RecurrenttransferinputComponent;
  let fixture: ComponentFixture<RecurrenttransferinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransferinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransferinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
