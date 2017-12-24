import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HuntShareDialogComponent } from './hunt-share-dialog.component';

describe('HuntShareDialogComponent', () => {
  let component: HuntShareDialogComponent;
  let fixture: ComponentFixture<HuntShareDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HuntShareDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HuntShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
