import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetgroupviewComponent } from './assetgroupview.component';

describe('AssetgroupviewComponent', () => {
  let component: AssetgroupviewComponent;
  let fixture: ComponentFixture<AssetgroupviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetgroupviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetgroupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
