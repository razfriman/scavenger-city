import { Component, OnInit, Inject } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HuntShareDialogData } from 'app/models/hunt-share-dialog-data';

@Component({
  selector: 'app-hunt-share-dialog',
  templateUrl: './hunt-share-dialog.component.html',
  styleUrls: ['./hunt-share-dialog.component.scss']
})
export class HuntShareDialogComponent implements OnInit {

  shareID: string;
  url: string;

  constructor(
    private platformLocation: PlatformLocation,
    public dialogRef: MatDialogRef<HuntShareDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HuntShareDialogData) {
    this.shareID = data.shareID;
    this.url = `{${(platformLocation as any).location.origin}/join/${this.shareID}`;
  }

  ngOnInit() {

  }

}
