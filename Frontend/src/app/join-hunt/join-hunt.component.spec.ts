import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHuntComponent } from './join-hunt.component';

describe('JoinHuntComponent', () => {
  let component: JoinHuntComponent;
  let fixture: ComponentFixture<JoinHuntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinHuntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
