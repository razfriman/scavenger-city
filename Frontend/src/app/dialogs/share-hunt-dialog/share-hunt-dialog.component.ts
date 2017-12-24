import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HuntShareDialogData } from 'app/models/hunt-share-dialog-data';

@Component({
  selector: 'app-share-hunt-dialog',
  templateUrl: './share-hunt-dialog.component.html',
  styleUrls: ['./share-hunt-dialog.component.scss']
})
export class ShareHuntDialogComponent implements OnInit {

  shareID: string;

  constructor(
    public dialogRef: MatDialogRef<ShareHuntDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HuntShareDialogData) {
  console.log(data);
this.shareID = data.shareID;
  }

  ngOnInit() {

  }
}

