import { Component, OnInit, OnDestroy } from '@angular/core';
import { HuntInstance } from 'app/models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-join-hunt-detail',
  templateUrl: './join-hunt-detail.component.html',
  styleUrls: ['./join-hunt-detail.component.scss']
})
export class JoinHuntDetailComponent implements OnInit, OnDestroy {

  private id: string;
  hunt: HuntInstance;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = params['id'];

        if (!this.id) {
          this.router.navigate(['/join']);
          return;
        }

        this.apiService.getSharedInstance(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(x => {
            this.hunt = x.data;

            this.apiService.joinSharedInstance(this.id)
              .takeUntil(this.ngUnsubscribe)
              .subscribe(data => {
                console.log('Joined SignalR');
              });
          }, err => {
            this.router.navigate(['/join']);
            return;
          });
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
