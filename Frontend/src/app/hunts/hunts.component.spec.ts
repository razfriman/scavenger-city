import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntsComponent } from './hunts.component';

describe('HuntsComponent', () => {
  let component: HuntsComponent;
  let fixture: ComponentFixture<HuntsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
