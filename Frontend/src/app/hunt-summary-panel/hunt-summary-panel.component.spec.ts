import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntSummaryPanelComponent } from './hunt-summary-panel.component';

describe('HuntSummaryPanelComponent', () => {
  let component: HuntSummaryPanelComponent;
  let fixture: ComponentFixture<HuntSummaryPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntSummaryPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntSummaryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
