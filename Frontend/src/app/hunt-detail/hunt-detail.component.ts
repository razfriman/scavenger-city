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
  private hunt: Hunt;
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
    this.apiService.purchase(this.id)
      .subscribe(data => {
        console.log(data);
        this.snackBar.open('Success', '', { duration: 2000 });
        this.router.navigate(['/hunt-instance', data.data.huntInstanceID]);
      },
      error => {
        this.snackBar.open('Error', 'Cannot purchase hunt.', { duration: 2000 });
      });
  }

  hasSignedIn() {
    return this.authService.isAuthenticated();
  }
}
