import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Hunt } from '../models/hunt';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-hunt-detail',
  templateUrl: './hunt-detail.component.html',
  styleUrls: ['./hunt-detail.component.scss']
})
export class HuntDetailComponent implements OnInit, OnDestroy {

  private id: number;
  hunt: Hunt;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

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
          console.log(token);
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
    this.apiService.purchase(this.id, {
      email: token.email,
      token: token.id
    })
      .takeUntil(this.ngUnsubscribe)
      .subscribe(data => {

        console.log(data);

        // TODO - Show alert popup instead of a SnackBar
        this.snackBar.open('Success', '', { duration: 2000 });

        this.router.navigate(['/hunt-instances', data.data.huntInstanceID]);
      },
      error => {

        console.log(error);

        // TODO - Show alert popup instead of a SnackBar
        this.snackBar.open('Error', 'Cannot purchase hunt.', { duration: 2000 });
      });
  }
}
