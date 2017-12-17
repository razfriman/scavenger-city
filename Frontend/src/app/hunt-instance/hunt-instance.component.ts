import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { MatSnackBar } from '@angular/material';
import { HuntInstance } from '../models/hunt-instance';
import { Subject } from 'rxjs/Subject';
import { HuntStatus } from 'app/models/hunt-status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hunt-instance',
  templateUrl: './hunt-instance.component.html',
  styleUrls: ['./hunt-instance.component.scss']
})
export class HuntInstanceComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  hunt: HuntInstance;
  private id: number;
  private ngUnsubscribe = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      answer: ['', Validators.compose([Validators.required])]
    });

    this.reloadQuestion();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  start() {
    console.log('lets go!');
    this.apiService.start(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.reloadQuestion();
      });
  }

  getHint() {
    if (this.hunt &&
      this.hunt.currentQuestionInstance &&
      this.hunt.currentQuestionInstance.question &&
      this.hunt.currentQuestionInstance.question.hint) {
      return this.hunt.currentQuestionInstance.question.hint.text;
    }

    return 'NOT USED';
  }

  isHintUsed() {
    return this.hunt.currentQuestionInstance.question.hint;
  }

  hint() {
    this.apiService.hint(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.reloadQuestion();
      });
  }

  skip() {
    this.apiService.skip(this.id)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.reloadQuestion();
      });
  }

  submit() {
    this.apiService.submitAnswer(this.id, this.form.value.answer)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(x => {
        this.reloadQuestion();

        if (x.data.isCorrect) {
          this.snackBar.open('Success', 'That was correct!');
          this.form.reset();
          // Show a fact now! :)
        } else {
          this.snackBar.open('Sorry', 'That was incorrect, try again');
        }
      });
  }

  reloadQuestion() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(params => {
        this.id = +params['id'];

        if (!this.id) {
          this.router.navigate(['/404']);
          return;
        }

        this.apiService.getInstance(this.id)
          .takeUntil(this.ngUnsubscribe)
          .subscribe(x => {
            this.hunt = x.data;
          }, err => {
            this.router.navigate(['/404']);
            return;
          });
      });
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
