import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrenttransactioneditorformComponent } from './recurrenttransactioneditorform.component';

describe('RecurrenttransactioneditorComponent', () => {
  let component: RecurrenttransactioneditorformComponent;
  let fixture: ComponentFixture<RecurrenttransactioneditorformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrenttransactioneditorformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrenttransactioneditorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
