import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Question } from 'app/models/question';
import { FactDialogComponent } from 'app/dialogs/fact-dialog/fact-dialog.component';
import { FactDialogData } from 'app/models/fact-dialog-data';
import { MessageDialogComponent } from 'app/dialogs/message-dialog/message-dialog.component';
import { MessageDialogData } from 'app/models/message-dialog-data';
import { MatDialog } from '@angular/material';
import { HuntShareDialogComponent } from 'app/hunt-share-dialog/hunt-share-dialog.component';
import { HuntShareDialogData } from 'app/models/hunt-share-dialog-data';

@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {

  }

  openFactDialog(question: Question): void {
    const dialogRef = this.dialog.open(FactDialogComponent, {
      width: '250px',
      data: { fact: question.fact } as FactDialogData
    });
  }

  openMessageDialog(title: string, message: string, closeButtonLabel: string = 'Close'): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: {
        title: title,
        message: message,
        closeButtonLabel: closeButtonLabel
      } as MessageDialogData
    });
  }

  openHuntShareDialog(shareID: string): void {
    const dialogRef = this.dialog.open(HuntShareDialogComponent, {
      width: '300px',
      data: {
        shareID: shareID
      } as HuntShareDialogData
    });
  }
}
