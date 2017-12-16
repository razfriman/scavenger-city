import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-hunt-detail',
  templateUrl: './hunt-detail.component.html',
  styleUrls: ['./hunt-detail.component.scss']
})
export class HuntDetailComponent implements OnInit, OnDestroy {

  private id: number;
  private hunt: any = {};
  private routeSub: Subscription;
  private huntSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
   private apiService: ApiService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = +params['id'];

      if (!this.id) {
        this.router.navigate(['/404']);
        return;
      }

      this.apiService.getHunt(this.id)
      .subscribe((x: any) => {
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
