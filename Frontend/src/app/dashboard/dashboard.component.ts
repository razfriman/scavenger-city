import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HuntInstance } from '../models/hunt-instance';
import { Hunt } from '../models/hunt';
import { HuntStatus } from '../models/hunt-status';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }

  private huntInstances: HuntInstance[];
  private ngUnsubscribe = new Subject();

  ngOnInit() {
    this.apiService.getInstances()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.huntInstances = x.data;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
