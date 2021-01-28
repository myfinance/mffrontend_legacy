import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetviewComponent } from './assetview.component';

describe('AssetviewComponent', () => {
  let component: AssetviewComponent;
  let fixture: ComponentFixture<AssetviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
