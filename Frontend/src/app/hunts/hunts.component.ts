import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Hunt } from '../models/hunt';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-hunts',
  templateUrl: './hunts.component.html',
  styleUrls: ['./hunts.component.scss']
})
export class HuntsComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }

  private hunts: Hunt[];
  private ngUnsubscribe = new Subject();

  ngOnInit() {
    this.apiService.getHunts()
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.hunts = x.data;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
