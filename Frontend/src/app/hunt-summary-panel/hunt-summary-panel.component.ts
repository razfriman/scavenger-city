import { Component, OnInit, Input } from '@angular/core';
import { HuntInstanceComponent } from 'app/hunt-instance/hunt-instance.component';
import { HuntInstance } from 'app/models/hunt-instance';
import { HuntShareDialogData } from 'app/models/hunt-share-dialog-data';
import { MatDialog } from '@angular/material';
import { HuntShareDialogComponent } from 'app/hunt-share-dialog/hunt-share-dialog.component';
import { DialogService } from 'app/services/dialog.services';

@Component({
  selector: 'app-hunt-summary-panel',
  templateUrl: './hunt-summary-panel.component.html',
  styleUrls: ['./hunt-summary-panel.component.scss']
})
export class HuntSummaryPanelComponent implements OnInit {

  @Input('hunt')
  public hunt: HuntInstance;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  openDialog(shareID: string): void {
    this.dialogService.openHuntShareDialog(this.hunt.shareID);
  }
}
