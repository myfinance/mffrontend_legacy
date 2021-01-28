import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetdetailsviewComponent } from './assetdetailsview.component';

describe('AssetdetailsviewComponent', () => {
  let component: AssetdetailsviewComponent;
  let fixture: ComponentFixture<AssetdetailsviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetdetailsviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetdetailsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
