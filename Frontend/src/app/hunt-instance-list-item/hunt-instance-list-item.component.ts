import { Component, OnInit, Input } from '@angular/core';
import { Hunt } from 'app/models/hunt';
import { HuntInstance } from 'app/models/hunt-instance';
import { HuntStatus } from 'app/models/hunt-status';

@Component({
  selector: 'app-hunt-instance-list-item',
  templateUrl: './hunt-instance-list-item.component.html',
  styleUrls: ['./hunt-instance-list-item.component.scss']
})
export class HuntInstanceListItemComponent implements OnInit {


  @Input('hunt')
  hunt: HuntInstance;

  constructor() { }

  ngOnInit() {
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
}
