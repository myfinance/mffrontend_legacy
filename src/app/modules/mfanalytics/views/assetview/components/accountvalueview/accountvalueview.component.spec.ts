import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountValueViewComponent } from './accountvalueview.component';

describe('AssetgroupviewComponent', () => {
  let component: AccountValueViewComponent;
  let fixture: ComponentFixture<AccountValueViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountValueViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountValueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
