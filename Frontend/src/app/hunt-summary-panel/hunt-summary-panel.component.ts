import { Component, OnInit, Input } from '@angular/core';
import { HuntInstanceComponent } from 'app/hunt-instance/hunt-instance.component';
import { HuntInstance } from 'app/models/hunt-instance';
import { HuntShareDialogData } from 'app/models/hunt-share-dialog-data';
import { ShareHuntDialogComponent } from 'app/Dialogs/share-hunt-dialog/share-hunt-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-hunt-summary-panel',
  templateUrl: './hunt-summary-panel.component.html',
  styleUrls: ['./hunt-summary-panel.component.scss']
})
export class HuntSummaryPanelComponent implements OnInit {

  @Input('hunt')
  public hunt: HuntInstance;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShareHuntDialogComponent, {
      width: '250px',
      data: {
        shareID: this.hunt.shareID
      } as HuntShareDialogData
    });
  }
}
