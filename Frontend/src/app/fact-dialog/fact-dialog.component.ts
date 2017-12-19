import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Question } from 'app/models/question';

@Component({
  selector: 'app-fact-dialog',
  templateUrl: './fact-dialog.component.html',
  styleUrls: ['./fact-dialog.component.scss']
})
export class FactDialogComponent implements OnInit {

  question: Question;

  constructor(
    public dialogRef: MatDialogRef<FactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.question = data.question;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
