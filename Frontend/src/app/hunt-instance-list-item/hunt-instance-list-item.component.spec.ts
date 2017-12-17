import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntInstanceListItemComponent } from './hunt-instance-list-item.component';

describe('HuntInstanceListItemComponent', () => {
  let component: HuntInstanceListItemComponent;
  let fixture: ComponentFixture<HuntInstanceListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntInstanceListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntInstanceListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
