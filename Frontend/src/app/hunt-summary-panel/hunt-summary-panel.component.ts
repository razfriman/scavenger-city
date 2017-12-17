import { Component, OnInit, Input } from '@angular/core';
import { HuntInstanceComponent } from 'app/hunt-instance/hunt-instance.component';
import { HuntInstance } from 'app/models/hunt-instance';

@Component({
  selector: 'app-hunt-summary-panel',
  templateUrl: './hunt-summary-panel.component.html',
  styleUrls: ['./hunt-summary-panel.component.scss']
})
export class HuntSummaryPanelComponent implements OnInit {

  @Input('hunt')
  public hunt: HuntInstance;

  constructor() { }

  ngOnInit() {
  }
}
