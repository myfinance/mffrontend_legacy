import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentexpensesinputComponent } from './recurrentexpensesinput.component';

describe('RecurrentincomeexpensesComponent', () => {
  let component: RecurrentexpensesinputComponent;
  let fixture: ComponentFixture<RecurrentexpensesinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentexpensesinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentexpensesinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
