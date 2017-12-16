import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntDetailComponent } from './hunt-detail.component';

describe('HuntDetailComponent', () => {
  let component: HuntDetailComponent;
  let fixture: ComponentFixture<HuntDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
