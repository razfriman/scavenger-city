import { Component, OnInit, OnDestroy } from '@angular/core';
import { HuntInstance } from 'app/models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
  selector: 'app-join-hunt-detail',
  templateUrl: './join-hunt-detail.component.html',
  styleUrls: ['./join-hunt-detail.component.scss']
})
export class JoinHuntDetailComponent implements OnInit, OnDestroy {

  private _hubConnection: HubConnection;
  private id: string;
  hunt: HuntInstance;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {

    console.log('setting up hub connection');

    // this._hubConnection = new HubConnection('/hunt');
    this._hubConnection = new HubConnection('http://app.scavenger.city/hunt');

    this._hubConnection.on('HuntUpdated', () => {
      console.log('Received Event: HuntUpdated');
      this.reloadHunt();
    });

    console.log('hub is setup. Need to connect.');

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = params['id'];

        if (!this.id) {
          this.router.navigate(['/join']);
          return;
        }

        this.connectToSignalR();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  connectToSignalR() {

    console.log('starting hub connection');

    this._hubConnection.start()
      .then(() => {
        console.log('Hub connection started');
        this.joinGroup();
      })
      .catch(err => {
        console.log('Error while establishing connection');
      });
  }
  joinGroup() {
    this._hubConnection.invoke('JoinHunt', this.id)
      .then(() => {
        console.log('Joined group');
        this.reloadHunt();
      })
      .catch(err => {
        console.log('Error while joining group');
      });
  }

  reloadHunt() {
    this.apiService.getSharedInstance(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.hunt = x.data;
      }, err => {
        this.router.navigate(['/join']);
        return;
      });
  }

}
