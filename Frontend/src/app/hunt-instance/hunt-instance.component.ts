import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material';
import { HuntInstance } from '../models/hunt-instance';

@Component({
  selector: 'app-hunt-instance',
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.scss']
})
export class HuntInstanceComponent implements OnInit, OnDestroy {

  private id: number;
  private hunt: HuntInstance;
  private routeSub: Subscription;
  private huntSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (!this.id) {
        this.router.navigate(['/404']);
        return;
      }

      this.apiService.getInstance(this.id)
        .subscribe(x => {
          this.hunt = x.data;
        }, err => {
          this.router.navigate(['/404']);
          return;
        });
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();

    if (this.huntSub) {
      this.huntSub.unsubscribe();
    }
  }

}
