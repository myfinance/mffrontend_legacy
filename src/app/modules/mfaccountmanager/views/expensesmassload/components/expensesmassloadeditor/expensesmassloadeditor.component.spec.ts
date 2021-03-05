import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesmassloadeditorComponent } from './expensesmassloadeditor.component';

describe('ExpensesmassloadeditorComponent', () => {
  let component: ExpensesmassloadeditorComponent;
  let fixture: ComponentFixture<ExpensesmassloadeditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesmassloadeditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesmassloadeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
