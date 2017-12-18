import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedHuntInstancesComponent } from './completed-hunt-instances.component';

describe('CompletedHuntInstancesComponent', () => {
  let component: CompletedHuntInstancesComponent;
  let fixture: ComponentFixture<CompletedHuntInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedHuntInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedHuntInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
