import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinHuntDetailComponent } from './join-hunt-detail.component';

describe('JoinHuntDetailComponent', () => {
  let component: JoinHuntDetailComponent;
  let fixture: ComponentFixture<JoinHuntDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinHuntDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinHuntDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
