import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntSummaryComponent } from './hunt-summary.component';

describe('HuntSummaryComponent', () => {
  let component: HuntSummaryComponent;
  let fixture: ComponentFixture<HuntSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
