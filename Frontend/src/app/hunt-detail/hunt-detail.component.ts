import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Hunt } from '../models/hunt';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { MessageDialogComponent } from 'app/dialogs/message-dialog/message-dialog.component';
import { MessageDialogData } from 'app/models/message-dialog-data';

@Component({
  selector: 'app-hunt-detail',
  templateUrl: './hunt-detail.component.html',
  styleUrls: ['./hunt-detail.component.scss']
})
export class HuntDetailComponent implements OnInit, OnDestroy {

  private id: number;
  hunt: Hunt;
  submitted: boolean;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];

        if (!this.id) {
          this.router.navigate(['/404']);
          return;
        }

        this.apiService.getHunt(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(x => {
            this.hunt = x.data;
          }, err => {
            this.router.navigate(['/404']);
            return;
          });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  purchase() {

    const handler = (<any>window).StripeCheckout
      .configure({
        key: 'pk_test_Gcszgnmu3v1mmaUEMvWzsNmX',
        locale: 'auto',
        token: (token: any) => {
          this.chargePurchase(token);
        }
      });

    handler.open({
      name: 'Scavenger City',
      description: this.hunt.name,
      amount: 200,
      bitcoin: true
    });
  }

  hasSignedIn() {
    return this.authService.isAuthenticated();
  }

  chargePurchase(token: any) {

    this.submitted = true;
    this.apiService.purchase(this.id, {
      email: token.email,
      token: token.id
    })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {
        this.submitted = false;
        this.openDialog('Success', `Congratulations, you just purchased the ${this.hunt.name} hunt!`);
        this.router.navigate(['/hunt-instances', data.data.huntInstanceID]);
      },
      error => {
        this.submitted = false;
        this.openDialog('Error', error.error.data);
      });
  }

  openDialog(title: string, message: string, closeButtonLabel: string = 'Close'): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: {
        title: title,
        message: message,
        closeButtonLabel: closeButtonLabel
      } as MessageDialogData
    });
  }
}
