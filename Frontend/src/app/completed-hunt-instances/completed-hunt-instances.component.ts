import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { Subject } from 'rxjs/Subject';
import { HuntInstance } from 'app/models/hunt-instance';

@Component({
  selector: 'app-completed-hunt-instances',
  templateUrl: './completed-hunt-instances.component.html',
  styleUrls: ['./completed-hunt-instances.component.scss']
})
export class CompletedHuntInstancesComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }

  huntInstances: HuntInstance[];
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
