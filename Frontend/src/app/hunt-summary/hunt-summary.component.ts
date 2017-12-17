import { Component, OnInit, Input } from '@angular/core';
import { HuntInstance } from 'app/models/hunt-instance';
import { HuntStatus } from 'app/models/hunt-status';

@Component({
  selector: 'app-hunt-summary',
  templateUrl: './hunt-summary.component.html',
  styleUrls: ['./hunt-summary.component.scss']
})
export class HuntSummaryComponent implements OnInit {

  @Input('hunt')
  public hunt: HuntInstance;

  constructor() { }

  ngOnInit() {
  }

  isAvailable(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.Available;
  }

  getHuntStatus(): string {

    if (!this.hunt) {
      return null;
    }

    switch (this.hunt.status) {
      case HuntStatus.Available:
        return 'Available';
      case HuntStatus.InProgress:
        return 'In Progress';
      case HuntStatus.Finished:
        return 'Finished';
      default:
        return 'Unknown';
    }
  }

  getDuration() {
    const startTime = new Date(this.hunt.startTime);
    const endTime = new Date(this.hunt.endTime);
    return endTime.valueOf() - startTime.valueOf();
  }

}
