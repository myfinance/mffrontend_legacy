import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetviewcontrollerComponent } from './assetviewcontroller.component';

describe('AssetviewcontrollerComponent', () => {
  let component: AssetviewcontrollerComponent;
  let fixture: ComponentFixture<AssetviewcontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetviewcontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetviewcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
