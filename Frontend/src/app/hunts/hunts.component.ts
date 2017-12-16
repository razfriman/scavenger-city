import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-hunts',
  templateUrl: './hunts.component.html',
  styleUrls: ['./hunts.component.scss']
})
export class HuntsComponent implements OnInit, OnDestroy {

  constructor(private apiService: ApiService) { }

  subscription: Subscription;
  hunts: Array<any>;

  ngOnInit() {
    this.subscription = this.apiService.getHunts().subscribe((x: any) => {
      this.hunts = x.data as Array<any>;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
