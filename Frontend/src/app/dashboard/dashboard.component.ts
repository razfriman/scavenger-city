import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../services/api.service';
import { HuntInstance } from '../models/hunt-instance';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }

  subscription: Subscription;
  huntInstances: HuntInstance[];

  ngOnInit() {
    this.subscription = this.apiService.getInstances().subscribe(x => {
      this.huntInstances = x.data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
