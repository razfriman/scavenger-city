import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Question } from 'app/models/question';
import { FactDialogData } from 'app/models/fact-dialog-data';

@Component({
  selector: 'app-fact-dialog',
  templateUrl: './fact-dialog.component.html',
  styleUrls: ['./fact-dialog.component.scss']
})
export class FactDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FactDialogData) {
  }

  ngOnInit() {
  }
}
