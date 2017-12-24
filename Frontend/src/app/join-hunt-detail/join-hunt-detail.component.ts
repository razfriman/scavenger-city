import { Component, OnInit, OnDestroy } from '@angular/core';
import { HuntInstance } from 'app/models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { HubConnection } from '@aspnet/signalr-client';
import { AuthService } from 'app/services/auth.service';
import { AnswerInstance } from 'app/models/answer-instance';
import { DialogService } from 'app/services/dialog.services';
import { HuntStatus } from 'app/models/hunt-status';

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
    private apiService: ApiService,
    private dialogService: DialogService) { }

  ngOnInit() {

    this._hubConnection = new HubConnection(`${ApiService.API_BASE}/hunt`);

    this._hubConnection.on('HuntUpdated', () => {
      console.log('Received Event: HuntUpdated');
      this.reloadHunt();
    });

    this._hubConnection.on('AnswerSubmitted', (answer: AnswerInstance) => {
      if (answer.isCorrect) {
        this.dialogService.openMessageDialog('Success', 'That was correct!');
      }
    });

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
    this._hubConnection.start()
      .then(() => {
        this.joinGroup();
      })
      .catch(err => {
        console.error('Error while establishing connection', err);
      });
  }

  joinGroup() {
    this._hubConnection.invoke('JoinHunt', this.id)
      .then(() => {
        this.reloadHunt();
      })
      .catch(err => {
        console.error('Error while joining group', err);
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

  getHint() {
    if (this.hunt &&
      this.hunt.currentQuestionInstance &&
      this.hunt.currentQuestionInstance.question &&
      this.hunt.currentQuestionInstance.question.hint) {
      return this.hunt.currentQuestionInstance.question.hint.text;
    }

    return '<NOT USED>';
  }

  isAvailable(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.Available;
  }

  isInProgress(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.InProgress;
  }

  isFinished(): boolean {
    return this.hunt && this.hunt.status === HuntStatus.Finished;
  }

}
