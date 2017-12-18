import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableHuntInstancesComponent } from './available-hunt-instances.component';

describe('AvailableHuntInstancesComponent', () => {
  let component: AvailableHuntInstancesComponent;
  let fixture: ComponentFixture<AvailableHuntInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableHuntInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableHuntInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
