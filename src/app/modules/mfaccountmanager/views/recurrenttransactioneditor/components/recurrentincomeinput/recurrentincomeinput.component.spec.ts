import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurrentincomeinputComponent } from './recurrentincomeinput.component';

describe('RecurrentincomeinputComponent', () => {
  let component: RecurrentincomeinputComponent;
  let fixture: ComponentFixture<RecurrentincomeinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurrentincomeinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurrentincomeinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
