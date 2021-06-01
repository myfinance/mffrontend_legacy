import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentconfiguratorComponent } from './instrumentconfigurator.component';

describe('InstrumentconfiguratorComponent', () => {
  let component: InstrumentconfiguratorComponent;
  let fixture: ComponentFixture<InstrumentconfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentconfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentconfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
