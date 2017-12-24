import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHuntDialogComponent } from './share-hunt-dialog.component';

describe('ShareHuntDialogComponent', () => {
  let component: ShareHuntDialogComponent;
  let fixture: ComponentFixture<ShareHuntDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareHuntDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareHuntDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
